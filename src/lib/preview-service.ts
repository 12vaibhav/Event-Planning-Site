/**
 * Virtual Preview Service
 * 
 * Handles the complete Virtual 3D Preview flow using Puter.js natively!
 * 1. Upload venue photo to Supabase Storage
 * 2. Create preview record in DB
 * 3. Call Puter.js (Nano Banana / Gemini Flash preview) for FREE Image-to-Image generation
 * 4. Parse output, upload to Storage, return generated image URL
 */
import { supabase } from './supabase';
import { getSession } from './auth';
import { validateImageFile } from './validation';
import type { PreviewTheme, PreviewStatus } from '../types/database.types';

// Puter globally no longer needed


export interface PreviewGenerationResult {
  success: boolean;
  previewId?: string;
  generatedImageUrl?: string;
  theme?: string;
  processingTimeMs?: number;
  remainingToday?: number;
  error?: string;
  message?: string;
}

export interface PreviewRecord {
  id: string;
  theme: PreviewTheme;
  originalImageUrl: string;
  generatedImageUrl: string | null;
  status: PreviewStatus;
  createdAt: string;
  processingTimeMs: number | null;
}

const THEME_MAP: Record<string, PreviewTheme> = {
  'Mehndi Vibes': 'mehndi_vibes',
  'Sangeet Glow': 'sangeet_glow',
  'Grand Wedding': 'grand_wedding',
  'Bride-Groom Entry': 'bride_groom_entry',
  'Birthday Fun': 'birthday_fun',
  'Custom': 'custom',
};

export function themeDisplayToKey(displayName: string): PreviewTheme {
  return THEME_MAP[displayName] || 'custom';
}

function fileToBase64Clean(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIMENSION = 1024;
        
        if (width > height) {
          if (width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

// ensurePuterReady no longer needed


export async function generatePreview(
  file: File,
  themeDisplayName: string,
  customPrompt?: string
): Promise<PreviewGenerationResult> {
  try {
    const validation = validateImageFile(file);
    if (!validation.valid) return { success: false, error: validation.error };

    const session = await getSession();
    if (!session) return { success: false, error: 'Please sign in to generate a preview', message: 'Auth required' };

    const userId = session.user.id;
    const theme = themeDisplayToKey(themeDisplayName);

    const fileExt = file.name.split('.').pop() || 'jpg';
    const originalFileName = `${userId}/${Date.now()}_original.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('venue-uploads').upload(originalFileName, file);
    if (uploadError) return { success: false, error: 'Failed to upload venue photo.' };

    const { data: urlData } = supabase.storage.from('venue-uploads').getPublicUrl(originalFileName);
    const originalImageUrl = urlData.publicUrl;

    const { data: previewRecord, error: dbError } = await supabase.from('virtual_previews').insert({
      user_id: userId, theme, custom_prompt: customPrompt || null,
      original_image_url: originalImageUrl, original_image_path: originalFileName, status: 'pending',
    }).select('id').single();

    if (dbError || !previewRecord) return { success: false, error: 'Failed to create database record.' };

    const imageBase64 = await fileToBase64Clean(file);

    console.log(`Requesting Image-to-Image Generation from Backend (HuggingFace API)...`);
    const { data: edgeFnData, error: edgeFnError } = await supabase.functions.invoke(
      'generate-preview',
      {
        body: { imageBase64, themeDisplay: themeDisplayName, previewId: previewRecord.id },
        headers: { Authorization: `Bearer ${session.access_token}` },
      }
    );

    if (edgeFnError) {
      console.error('Raw Edge Error:', edgeFnError);
      let trueErrorMsg = edgeFnError.message || 'AI generation failed.';
      try {
        if (edgeFnError.context && typeof edgeFnError.context.json === 'function') {
          const contextBody = await edgeFnError.context.json();
          if (contextBody.error) trueErrorMsg = contextBody.error;
        }
      } catch (e) {}

      return { success: false, error: `Backend Error: ${trueErrorMsg}` };
    }

    if (!edgeFnData || edgeFnData.error) {
       return { success: false, error: edgeFnData?.error || "Unknown edge function failure." };
    }

    return { 
       success: true, 
       previewId: previewRecord.id, 
       generatedImageUrl: edgeFnData.generatedImageUrl, 
       theme: themeDisplayName 
    };

  } catch (err: any) {
    console.error('Final Generation Error:', err);
    return { success: false, error: `System Error: ${err.message}` };
  }
}

export async function getUserPreviews(): Promise<PreviewRecord[]> {
  const { data, error } = await supabase.from('virtual_previews').select('*').order('created_at', { ascending: false }).limit(20);
  if (error) return [];
  return data.map((row) => ({
    id: row.id, theme: row.theme as PreviewTheme, originalImageUrl: row.original_image_url,
    generatedImageUrl: row.generated_image_url, status: row.status as PreviewStatus,
    createdAt: row.created_at, processingTimeMs: row.processing_time_ms,
  }));
}

export async function getDailyPreviewCount(): Promise<number> {
  const session = await getSession();
  if (!session) return 0;
  const { data, error } = await supabase.rpc('get_daily_preview_count', { p_user_id: session.user.id });
  return error ? 0 : (data || 0);
}

export async function getPreviewById(previewId: string): Promise<PreviewRecord | null> {
  const { data, error } = await supabase.from('virtual_previews').select('*').eq('id', previewId).single();
  if (error || !data) return null;
  return {
    id: data.id, theme: data.theme as PreviewTheme, originalImageUrl: data.original_image_url,
    generatedImageUrl: data.generated_image_url, status: data.status as PreviewStatus,
    createdAt: data.created_at, processingTimeMs: data.processing_time_ms,
  };
}

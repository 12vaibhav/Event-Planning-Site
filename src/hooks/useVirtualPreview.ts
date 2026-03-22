/**
 * useVirtualPreview Hook
 * 
 * Encapsulates the entire Virtual 3D Preview flow with state management.
 * Used by the Home page's Virtual Preview section.
 */
import React, { useState, useCallback, useRef } from 'react';
import { generatePreview, getDailyPreviewCount, themeDisplayToKey } from '../lib/preview-service';
import type { PreviewGenerationResult } from '../lib/preview-service';

// ============================================================
// Types
// ============================================================
export type PreviewState = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

interface UseVirtualPreviewReturn {
  // State
  previewState: PreviewState;
  selectedFile: File | null;
  filePreviewUrl: string | null;
  generatedImageUrl: string | null;
  error: string | null;
  remainingToday: number;
  processingTime: number | null;

  // Actions
  handleFileSelect: (file: File) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  generateVirtualPreview: (themeDisplayName: string, customPrompt?: string) => Promise<void>;
  reset: () => void;
  checkDailyLimit: () => Promise<void>;
}

// ============================================================
// Hook
// ============================================================
export function useVirtualPreview(): UseVirtualPreviewReturn {
  const [previewState, setPreviewState] = useState<PreviewState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingToday, setRemainingToday] = useState(5);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Handle file selection from file input or drag & drop.
   */
  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    // Validate file size (max 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10 MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setPreviewState('uploading');

    // Create local preview URL
    const url = URL.createObjectURL(file);
    setFilePreviewUrl(url);

    // Auto-transition to show uploaded state
    setTimeout(() => {
      setPreviewState('idle');
    }, 800);
  }, []);

  /**
   * Handle drag & drop events.
   */
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  /**
   * Generate the virtual preview by calling the backend.
   */
  const generateVirtualPreview = useCallback(async (
    themeDisplayName: string,
    customPrompt?: string
  ) => {
    if (!selectedFile) {
      setError('Please upload a venue photo first');
      return;
    }

    setError(null);
    setPreviewState('processing');
    setProcessingTime(null);

    try {
      const result: PreviewGenerationResult = await generatePreview(
        selectedFile,
        themeDisplayName,
        customPrompt
      );

      if (result.success) {
        setGeneratedImageUrl(result.generatedImageUrl || null);
        setPreviewState('done');
        setProcessingTime(result.processingTimeMs || null);
        if (result.remainingToday !== undefined) {
          setRemainingToday(result.remainingToday);
        }
      } else {
        setError(result.message || result.error || 'Generation failed');
        setPreviewState('error');
        if (result.remainingToday !== undefined) {
          setRemainingToday(result.remainingToday);
        }
      }
    } catch (err) {
      console.error('Preview generation error:', err);
      setError('An unexpected error occurred. Please try again.');
      setPreviewState('error');
    }
  }, [selectedFile]);

  /**
   * Reset the preview state for a new generation.
   */
  const reset = useCallback(() => {
    setPreviewState('idle');
    setSelectedFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    setGeneratedImageUrl(null);
    setError(null);
    setProcessingTime(null);
  }, [filePreviewUrl]);

  /**
   * Check the daily preview limit.
   */
  const checkDailyLimit = useCallback(async () => {
    try {
      const count = await getDailyPreviewCount();
      setRemainingToday(Math.max(0, 5 - count));
    } catch {
      // Silently fail – user can still try
    }
  }, []);

  return {
    previewState,
    selectedFile,
    filePreviewUrl,
    generatedImageUrl,
    error,
    remainingToday,
    processingTime,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    generateVirtualPreview,
    reset,
    checkDailyLimit,
  };
}

/**
 * Contact & Quote Submission Service
 * 
 * Handles submitting contact forms and quote requests to Supabase.
 */
import { supabase } from './supabase';
import { getSession } from './auth';
import { contactFormSchema, quoteRequestSchema } from './validation';
import type { ContactFormData, QuoteRequestData } from './validation';
import type { Database } from '../types/database.types';

// ============================================================
// Types
// ============================================================
export interface SubmissionResult {
  success: boolean;
  id?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

// ============================================================
// Submit Contact Form (no auth required)
// ============================================================
export async function submitContactForm(formData: ContactFormData): Promise<SubmissionResult> {
  try {
    // Validate with Zod
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      return { success: false, error: 'Please fix the form errors', fieldErrors };
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        event_type: parsed.data.eventType,
        event_date: parsed.data.eventDate || null,
        venue: parsed.data.venue || null,
        message: parsed.data.message,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Contact form submission error:', error);
      return { success: false, error: 'Failed to submit your inquiry. Please try again.' };
    }

    return { success: true, id: data?.id ?? undefined };
  } catch (err) {
    console.error('Contact submission error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

// ============================================================
// Submit Quote Request (auth required)
// ============================================================
export async function submitQuoteRequest(formData: QuoteRequestData): Promise<SubmissionResult> {
  try {
    // Validate with Zod
    const parsed = quoteRequestSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      return { success: false, error: 'Please fix the form errors', fieldErrors };
    }

    // Check authentication
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Please sign in to request a quote' };
    }

    const { data, error } = await supabase
      .from('quotes')
      .insert({
        user_id: session.user.id,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        event_type: parsed.data.eventType,
        event_date: parsed.data.eventDate || null,
        venue: parsed.data.venue || null,
        message: parsed.data.message,
        estimated_budget: parsed.data.estimatedBudget || null,
        guest_count: parsed.data.guestCount || null,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Quote request error:', error);
      return { success: false, error: 'Failed to submit your quote request. Please try again.' };
    }

    return { success: true, id: data?.id ?? undefined };
  } catch (err) {
    console.error('Quote submission error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

// ============================================================
// Fetch User's Quotes (auth required)
// ============================================================
export async function getUserQuotes() {
  const session = await getSession();
  if (!session) return [];

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch quotes error:', error);
    return [];
  }

  return data || [];
}

// ============================================================
// Fetch Packages (public)
// ============================================================
export async function getPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Fetch packages error:', error);
    return [];
  }

  return data || [];
}

// ============================================================
// Fetch Portfolio Items (public)
// ============================================================
export async function getPortfolioItems(eventType?: string) {
  let query = supabase
    .from('portfolio_items')
    .select('*')
    .order('display_order', { ascending: true });

  if (eventType && eventType !== 'all') {
    query = query.eq('event_type', eventType as Database["public"]["Enums"]["event_type"]);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Fetch portfolio error:', error);
    return [];
  }

  return data || [];
}

// ============================================================
// Fetch Featured Portfolio Items (public)
// ============================================================
export async function getFeaturedPortfolioItems() {
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(6);

  if (error) {
    console.error('Fetch featured portfolio error:', error);
    return [];
  }

  return data || [];
}

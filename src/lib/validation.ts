/**
 * Zod Validation Schemas
 * 
 * Centralized validation for all forms and API payloads.
 */
import { z } from 'zod';

// ============================================================
// Contact Form Validation
// ============================================================
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be under 50 characters')
    .trim(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be under 50 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be under 100 characters')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be under 15 digits')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  eventType: z.enum(
    ['wedding', 'mehndi', 'reception', 'birthday', 'other'],
    'Please select an event type'
  ),
  eventDate: z.string().optional(),
  venue: z.string().max(200, 'Venue must be under 200 characters').optional(),
  message: z
    .string()
    .min(10, 'Please describe your vision in at least 10 characters')
    .max(2000, 'Message must be under 2000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================
// Quote Request Validation
// ============================================================
export const quoteRequestSchema = z.object({
  firstName: z.string().min(2).max(50).trim(),
  lastName: z.string().min(2).max(50).trim(),
  email: z.string().email().max(100).trim().toLowerCase(),
  phone: z.string().min(10).max(15).regex(/^[+]?[\d\s-()]+$/),
  eventType: z.enum([
    'wedding',
    'mehndi_sangeet',
    'ladies_sangeet',
    'bride_groom_entry',
    'birthday',
    'family_ceremony',
    'other',
  ]),
  eventDate: z.string().optional(),
  venue: z.string().max(200).optional(),
  message: z.string().min(10).max(2000).trim(),
  estimatedBudget: z.string().optional(),
  guestCount: z.number().int().positive().max(10000).optional(),
});

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

// ============================================================
// Virtual Preview Validation
// ============================================================
export const previewRequestSchema = z.object({
  theme: z.enum([
    'mehndi_vibes',
    'sangeet_glow',
    'grand_wedding',
    'bride_groom_entry',
    'birthday_fun',
    'custom',
  ]),
  customPrompt: z
    .string()
    .max(500, 'Custom prompt must be under 500 characters')
    .optional(),
});

export type PreviewRequestData = z.infer<typeof previewRequestSchema>;

// ============================================================
// Auth Validation
// ============================================================
export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be under 72 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase, one lowercase, and one number'
    ),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type SignInData = z.infer<typeof signInSchema>;

// ============================================================
// File Upload Validation
// ============================================================
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Allowed: JPEG, PNG, WebP`,
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum: 10 MB`,
    };
  }
  return { valid: true };
}

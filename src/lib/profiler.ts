// Types for the API responses
interface Household {
  id: string;
  name: string;
  // Add other household properties as needed
}

// Full member interface from API
interface Member {
  id: string;
  name: string;
  age?: number;
  dateOfBirth?: string;
  sex?: string;
  height?: string;
  weight?: string;
  activityLevel?: string;
  goals?: string[];
  allergens?: string | string[]; // Can be JSON string or array
  exclusions?: string | string[]; // Can be JSON string or array
  likes?: string[];
  dislikes?: string[];
  medicalNotes?: string;
  photo?: string; // base64 or URL
  // Add other member properties as needed
}

// Lean member interface for UI display
interface LeanMember {
  id: string;
  name: string;
  dob?: string;
  age?: number;
  height?: string;
  weight?: string;
  photo?: string;
}

// Import Next.js cache revalidation function
import { revalidateTag } from 'next/cache';

// Helper functions for data formatting
function formatAge(dob?: string, age?: number): string {
  if (age && typeof age === 'number') {
    return `${age} years old`;
  }
  
  if (dob && typeof dob === 'string') {
    try {
      const birthDate = new Date(dob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        const ageInYears = Math.floor((today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        return `${ageInYears} years old`;
      }
    } catch {
      // Invalid date, fall through
    }
  }
  
  return 'Age not specified';
}

function formatHeight(height?: string | number): string {
  if (!height) return '';
  
  const heightNum = typeof height === 'string' ? parseInt(height, 10) : height;
  
  if (isNaN(heightNum) || heightNum <= 0) return '';
  
  const feet = Math.floor(heightNum / 12);
  const inches = heightNum % 12;
  
  if (feet === 0) {
    return `${inches}"`;
  } else if (inches === 0) {
    return `${feet}'`;
  } else {
    return `${feet}'${inches}"`;
  }
}

function formatList(items?: string[], max: number = 3): string {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return 'None';
  }
  
  // Filter out non-string items and limit to max
  const validItems = items
    .filter(item => typeof item === 'string' && item.trim().length > 0)
    .slice(0, max);
  
  if (validItems.length === 0) {
    return 'None';
  }
  
  return validItems.join(', ');
}

function formatHeightWeight(height?: string, weight?: string): string {
  const parts = [];
  
  // Format height
  const formattedHeight = formatHeight(height);
  if (formattedHeight) {
    parts.push(`Height: ${formattedHeight}`);
  }
  
  // Format weight
  if (weight && (typeof weight === 'string' || typeof weight === 'number')) {
    const weightStr = String(weight).trim();
    if (weightStr.length > 0) {
      parts.push(`Weight: ${weightStr} lbs.`);
    }
  }
  
  if (parts.length === 0) {
    return 'Not specified';
  }
  
  return parts.join('\n');
}

function isValidPhotoUrl(photo?: string): boolean {
  if (!photo || typeof photo !== 'string') return false;
  
  // Accept any photo string from the Profiler API
  // The Profiler API should handle the photo format validation
  return photo.trim().length > 0;
}

// Helper function to transform full member to lean member
function transformToLeanMember(member: Member): LeanMember {
  return {
    id: member.id,
    name: member.name,
    dob: member.dateOfBirth,
    age: member.age,
    height: member.height,
    weight: member.weight,
    photo: member.photo,
  };
}

// Helper function to make API requests with Next.js fetch cache options
async function makeRequest<T>(
  endpoint: string,
  revalidateSeconds: number
): Promise<{ ok: boolean; data?: T; error?: string }> {
  // Try environment variable first, fallback to hardcoded for testing
  let baseUrl = process.env.PROFILER_BASE_URL;
  
  // Fallback for testing - remove this after fixing environment variables
  if (!baseUrl) {
    baseUrl = 'http://localhost:3000';
  }

  try {
    const fullUrl = `${baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if API key is provided
    const apiKey = process.env.PROFILER_API_KEY;
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
      // Next.js fetch cache options for server-side rendering
      next: {
        revalidate: revalidateSeconds,
        tags: ['profiler-data']
      }
    });

    if (response.status === 404) {
      return { ok: false, error: 'Not found' };
    }

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Get household information
 * @returns Promise with household data or error
 * Cache: 60 seconds (list endpoint)
 */
export async function getHousehold(): Promise<{ ok: boolean; data?: Household; error?: string }> {
  return makeRequest<Household>('/api/household', 60);
}

/**
 * Get all household members
 * @returns Promise with lean members array or error
 * Cache: 60 seconds (list endpoint)
 */
export async function getMembers(): Promise<{ ok: boolean; data?: LeanMember[]; error?: string }> {
  const result = await makeRequest<Member[]>('/api/members', 60);
  
  if (result.ok && result.data) {
    // Transform to lean members for UI display
    const leanMembers = result.data.map(transformToLeanMember);
    return { ok: true, data: leanMembers };
  }
  
  return result;
}

/**
 * Get a specific member by ID
 * @param id Member ID
 * @returns Promise with member data or error
 * Cache: 30 seconds (detail endpoint)
 */
export async function getMember(id: string): Promise<{ ok: boolean; data?: Member; error?: string }> {
  return makeRequest<Member>(`/api/members/${id}`, 30);
}

/**
 * Clear all caches (useful for testing or when data becomes stale)
 * Note: This now clears Next.js fetch cache tags instead of in-memory cache
 */
export async function clearCache(): Promise<void> {
  // Clear Next.js fetch cache by tag
  // This requires Next.js 13.4+ with app router
  if (typeof revalidateTag === 'function') {
    revalidateTag('profiler-data');
  }
}

/**
 * Clear specific cache by type
 * Note: This now clears Next.js fetch cache tags instead of in-memory cache
 * @param type Cache type to clear (currently clears all profiler data)
 */
export async function clearCacheByType(type: 'household' | 'members' | 'member'): Promise<void> {
  // Clear Next.js fetch cache by tag
  // This requires Next.js 13.4+ with app router
  if (typeof revalidateTag === 'function') {
    revalidateTag('profiler-data');
  }
}

// Export helper functions for UI use
export { formatAge, formatList, formatHeight, formatHeightWeight, isValidPhotoUrl, transformToLeanMember };
export type { LeanMember };

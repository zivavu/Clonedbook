/**
 * Algolia configuration
 * Supports both production and local mock environments
 */
import algoliasearch, { SearchClient } from 'algoliasearch';
import { mockAlgoliaInit } from '../mocks/algoliaMock';

// Check if we should use the mock implementation
const USE_MOCK =
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  (process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK === 'true' || process.env.USE_ALGOLIA_MOCK === 'true');

// Log environment variables for debugging
if (typeof window !== 'undefined') {
  console.log('Algolia environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- USE_ALGOLIA_MOCK:', process.env.USE_ALGOLIA_MOCK);
  console.log('- NEXT_PUBLIC_USE_ALGOLIA_MOCK:', process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK);
  console.log('- Using mock:', USE_MOCK);

  // Force clear any cached values if in development mode
  if (process.env.NODE_ENV === 'development') {
    if (
      (process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK === 'true' ||
        process.env.USE_ALGOLIA_MOCK === 'true') &&
      !USE_MOCK
    ) {
      console.warn('WARNING: Algolia mock setting mismatch. Try refreshing the page.');
    }
  }
}

// Algolia credentials from environment variables
const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'dummy_app_id';
const API_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ||
  'dummy_api_key';

// Initialize the Algolia client
export const searchClient = USE_MOCK ? mockAlgoliaInit() : algoliasearch(APP_ID, API_KEY);

// Create an index for users (used by the search functionality)
export const usersIndex = USE_MOCK
  ? { search: searchClient.search }
  : (searchClient as SearchClient).initIndex('users');

// Export flag for UI indicators
export const useMockAlgolia = USE_MOCK;

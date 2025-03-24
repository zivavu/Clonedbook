/**
 * Algolia configuration
 * Supports both production and local mock environments
 */
import algoliasearch, { SearchClient } from 'algoliasearch';
import { mockAlgoliaInit } from '../mocks/algoliaMock';

// Determine if we should use the mock implementation (client-side only)
let USE_MOCK = false;
if (typeof window !== 'undefined') {
  USE_MOCK =
    process.env.NODE_ENV === 'development' &&
    (process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK === 'true' ||
      process.env.USE_ALGOLIA_MOCK === 'true');
}

// Algolia credentials from environment variables
const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'dummy_app_id';
const API_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ||
  'dummy_api_key';

// Initialize the Algolia client - only done once
let searchClient: SearchClient;
let usersIndex: { search: any };

if (typeof window !== 'undefined') {
  // Log environment variables for debugging
  console.log('Algolia environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- USE_ALGOLIA_MOCK:', process.env.USE_ALGOLIA_MOCK);
  console.log('- NEXT_PUBLIC_USE_ALGOLIA_MOCK:', process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK);
  console.log('- Using mock:', USE_MOCK);
}

// Initialize client
if (USE_MOCK) {
  searchClient = mockAlgoliaInit();
  usersIndex = { search: searchClient.search };
} else {
  searchClient = algoliasearch(APP_ID, API_KEY);
  usersIndex = searchClient.initIndex('users');
}

// Export flag for UI indicators
export { searchClient, usersIndex };
export const useMockAlgolia = USE_MOCK;

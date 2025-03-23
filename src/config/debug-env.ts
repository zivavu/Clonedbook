/**
 * Utility to debug environment variables
 */

export function logEnvironmentVariables(): void {
  console.log('==========================================');
  console.log('ENVIRONMENT VARIABLES DEBUG');
  console.log('==========================================');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR);
  console.log('NEXT_PUBLIC_USE_FIREBASE_EMULATOR:', process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR);
  console.log('USE_ALGOLIA_MOCK:', process.env.USE_ALGOLIA_MOCK);
  console.log('NEXT_PUBLIC_USE_ALGOLIA_MOCK:', process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK);
  console.log('NEXT_PUBLIC_FIREBASE_API_KEY exists:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  console.log('NEXT_PUBLIC_API_KEY exists:', !!process.env.NEXT_PUBLIC_API_KEY);
  console.log('==========================================');
}

// Export a const that gets evaluated immediately
export const DEBUG_ENV = (() => {
  if (typeof window !== 'undefined') {
    console.log('Environment variables during module initialization:');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR);
    console.log(
      'NEXT_PUBLIC_USE_FIREBASE_EMULATOR:',
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
    );
    console.log('USE_ALGOLIA_MOCK:', process.env.USE_ALGOLIA_MOCK);
    console.log('NEXT_PUBLIC_USE_ALGOLIA_MOCK:', process.env.NEXT_PUBLIC_USE_ALGOLIA_MOCK);
  }
  return true;
})();

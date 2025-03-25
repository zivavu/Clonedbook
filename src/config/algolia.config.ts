import algoliasearch from 'algoliasearch';

// Check if we're in local development mode with emulators
const isLocalDev = process.env.NEXT_PUBLIC_USE_EMULATOR === 'true';

// Create Algolia mock for local development
class AlgoliaMock {
  private data: any[];
  private indices: Record<string, AlgoliaMock> = {};

  constructor(
    private indexName: string = 'users',
    data: any[] = [],
  ) {
    this.data = data || [];

    // Load local data if available
    if (typeof window !== 'undefined' && isLocalDev) {
      try {
        fetch('/api/algolia-data')
          .then((response) => response.json())
          .then((data) => {
            this.data = data;
            console.log(`Loaded ${data.length} records for Algolia mock index ${indexName}`);
          })
          .catch((error) => {
            console.error('Failed to load Algolia mock data:', error);
            // Try loading from local storage as fallback
            const localData = localStorage.getItem(`algolia_mock_${indexName}`);
            if (localData) {
              this.data = JSON.parse(localData);
              console.log(`Loaded ${this.data.length} records from local storage for Algolia mock`);
            }
          });
      } catch (error) {
        console.error('Error initializing Algolia mock:', error);
      }
    }
  }

  // Mock search method
  search(query: string, options?: any) {
    const searchOptions = options || {};
    const limit = searchOptions.hitsPerPage || 20;

    // Simple search implementation
    const results = this.data
      .filter((item) => {
        if (!query) return true;
        const searchText =
          `${item.firstName} ${item.lastName} ${item.middleName || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .slice(0, limit);

    return Promise.resolve({
      hits: results,
      nbHits: results.length,
      page: 0,
      nbPages: Math.ceil(results.length / limit),
      hitsPerPage: limit,
      query,
    });
  }

  // Support for Algolia's initIndex method
  initIndex(indexName: string) {
    if (!this.indices[indexName]) {
      this.indices[indexName] = new AlgoliaMock(indexName);
    }
    return this.indices[indexName];
  }
}

// Initialize Algolia or mock
let algoliaClient;
let searchClient;

if (isLocalDev) {
  // Use mock for local development
  algoliaClient = new AlgoliaMock();
  searchClient = algoliaClient;
  console.log('Using Algolia mock for local development');
} else {
  // Use real Algolia client for production
  algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
  );
  searchClient = algoliaClient;
}

export { algoliaClient, searchClient };
export default { algoliaClient, searchClient };

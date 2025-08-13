import algoliasearch from 'algoliasearch';
import { useEmulators } from './env';

interface IAlgoliaHit {
  objectID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  pictureUrl?: string;
}

interface IAlgoliaSearchResponse {
  hits: IAlgoliaHit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
}

interface IAlgoliaSearchOptions {
  hitsPerPage?: number;
  attributesToRetrieve?: string[];
}

class AlgoliaMock {
  private data: IAlgoliaHit[];
  private indices: Record<string, AlgoliaMock> = {};

  constructor(
    private indexName: string = 'users',
    data: IAlgoliaHit[] = [],
  ) {
    this.data = data;
    this.loadLocalData();
  }

  private async loadLocalData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const response = await fetch('/api/algolia-data');
      if (!response.ok) throw new Error('Failed to fetch Algolia data');

      const data = await response.json();
      this.data = data;
      console.log(`Loaded ${data.length} records for Algolia mock index ${this.indexName}`);
    } catch (error) {
      console.warn('Failed to load Algolia mock data from API:', error);
      this.loadFromLocalStorage();
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const localData = localStorage.getItem(`algolia_mock_${this.indexName}`);
      if (localData) {
        this.data = JSON.parse(localData);
        console.log(`Loaded ${this.data.length} records from local storage for Algolia mock`);
      }
    } catch (error) {
      console.error('Error loading Algolia mock from localStorage:', error);
    }
  }

  search(query: string, options?: IAlgoliaSearchOptions): Promise<IAlgoliaSearchResponse> {
    const searchOptions = options || {};
    const limit = searchOptions.hitsPerPage || 20;

    const results = this.data
      .filter((item) => {
        if (!query) return true;
        const searchText =
          `${item.firstName} ${item.lastName} ${item.middleName || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .slice(0, limit);
    console.log(results);

    return Promise.resolve({
      hits: results,
      nbHits: results.length,
      page: 0,
      nbPages: Math.ceil(results.length / limit),
      hitsPerPage: limit,
      query,
    });
  }

  initIndex(indexName: string): AlgoliaMock {
    if (!this.indices[indexName]) {
      this.indices[indexName] = new AlgoliaMock(indexName);
    }
    return this.indices[indexName];
  }
}

const algoliaClient = useEmulators
  ? new AlgoliaMock()
  : algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
    );

export { AlgoliaMock };
export const searchClient = algoliaClient;
export default { algoliaClient, searchClient };

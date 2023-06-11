import algoliasearch from 'algoliasearch/lite';

export const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
);

export const usersIndex = client.initIndex('users');

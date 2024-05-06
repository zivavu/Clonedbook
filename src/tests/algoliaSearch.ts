import { Selector, fixture } from 'testcafe';
import { BASE_HOME_URL } from './consts';

fixture('Search users').page(BASE_HOME_URL);

test('first search result contains user info and is clickable', async (t) => {
  const searchInput = Selector('[data-testid="search-input"]');
  const userResultsLinks = Selector('a[data-testid^="search-result-list-item-"]');

  await t.typeText(searchInput, 'a');

  const userResultsCount = await userResultsLinks.count;
  await t.expect(userResultsCount).gte(1);

  const firstUserListItem = userResultsLinks.nth(0);

  const userFullName = await firstUserListItem.find('p').innerText;
  await t.expect(userFullName).notEql('');

  await t.expect(firstUserListItem.exists).ok({ timeout: 1000 });

  const userProfileUrl = await firstUserListItem.getAttribute('href');
  await t.expect(userProfileUrl).contains('/profile/');

  await t.click(firstUserListItem);

  const currentUrl = await t.eval(() => window.location.href);
  await t.expect(currentUrl).contains(userProfileUrl);
});

import { Selector, t, test } from 'testcafe';
import { BASE_URL } from './consts';

fixture('Home Page').page(BASE_URL);

async function waitForPosts(selector: Selector, timeout: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const postCount = await selector.count;
    if (postCount > 0) return;
    await t.wait(500);
  }
  throw new Error('Timed out waiting for posts');
}

test('Posts are displayed on the home page', async (t) => {
  await t.expect(Selector('[data-testid="feed-post"]').exists).ok({ timeout: 10000 });
  const postCount = await Selector('[data-testid="feed-post"]').count;
  await t.expect(postCount).gt(0);
});

test('Infinite scroll loads more posts', async (t) => {
  await waitForPosts(Selector('[data-testid="feed-post"]'), 10000);
  const initialPostCount = await Selector('[data-testid="feed-post"]').count;
  await t.scroll(Selector('html'), 0, 7000);
  await t
    .expect(async () => {
      const newPostCount = await Selector('[data-testid="feed-post"]').count;
      return newPostCount > initialPostCount;
    })
    .ok({ timeout: 5000 });
});

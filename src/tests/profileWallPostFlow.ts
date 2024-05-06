import { Selector, fixture } from 'testcafe';
import { BASE_HOME_URL } from './consts';
const path = require('path');

fixture('Post flow').page(`${BASE_HOME_URL}/profile`);

test('user can add, edit, and delete a post', async (t) => {
  await t.expect(Selector('[data-testid="new-post-button"]').exists).ok({ timeout: 4000 });

  await t.click(Selector('[data-testid="new-post-button"]'));
  await t.typeText(Selector('[data-testid="new-post-text-input"]'), 'Test post content');
  await t.setFilesToUpload(
    Selector('[data-testid="new-post-image-input"]'),
    path.join(__dirname, './assets/test-image.png'),
  );
  await t.click(Selector('[data-testid="new-post-submit-button"]'));

  const postSelector = Selector('[data-testid="feed-post"]').nth(0);
  await t.expect(postSelector.exists).ok({ timeout: 2000 });

  await t.click(postSelector.find('[data-testid="manage-element-menu-button"]'));
  await t.expect(Selector('[data-testid="edit-element-button"]').exists).ok({ timeout: 2000 });
  await t.click(Selector('[data-testid="edit-element-button"]'));

  await t.typeText(
    postSelector.find('[data-testid="edit-element-text-content"]'),
    'Test post content - edited',
    { replace: true },
  );
  await t.click(postSelector.find('[data-testid="edit-element-submit"]'));

  await t
    .expect(postSelector.find('[data-testid="post-text-content"]').innerText)
    .contains('Test post content - edited', { timeout: 5000 });

  await t.click(postSelector.find('[data-testid="manage-element-menu-button"]'));
  await t.expect(Selector('[data-testid="delete-element-button"]').exists).ok({ timeout: 5000 });
  await t.click(Selector('[data-testid="delete-element-button"]'));
});

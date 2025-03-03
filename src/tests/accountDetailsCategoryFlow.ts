import { Selector, fixture, test } from 'testcafe';
import { BASE_URL } from './consts';

type TestController = Parameters<Parameters<typeof test>[1]>[0];

type DetailType =
  | 'worksAt'
  | 'jobTitle'
  | 'college'
  | 'highSchool'
  | 'livesIn'
  | 'bornin'
  | 'email'
  | 'phone'
  | 'gender'
  | 'birthdate';

const detailLabels: Record<DetailType, string> = {
  worksAt: 'Works at',
  jobTitle: 'Job title',
  college: 'College',
  highSchool: 'High school',
  livesIn: 'Lives in',
  bornin: 'Born in',
  email: 'Email',
  phone: 'Phone',
  gender: 'Gender',
  birthdate: 'Birth date',
};

fixture('Account Details Category Flow').page(`${BASE_URL}/profile`);

async function isDetailEditable(t: TestController, detailType: DetailType): Promise<boolean> {
  const label = detailLabels[detailType];

  const detailContainer = Selector('div').withText(label).parent('div');
  if (!(await detailContainer.exists)) {
    return false;
  }

  const editButton = detailContainer.find('button').withAttribute('aria-label', /edit|Edit/);
  return await editButton.exists;
}

async function editTextField(
  t: TestController,
  detailType: DetailType,
  newValue: string,
): Promise<string | null> {
  if (detailType === 'gender' || detailType === 'birthdate') {
    return null;
  }

  const label = detailLabels[detailType];

  const detailContainer = Selector('div').withText(label).parent('div');

  let originalValue = null;
  const valueElement = detailContainer.find('p').nth(1);
  if (await valueElement.exists) {
    originalValue = await valueElement.innerText;
  }

  const editButton = detailContainer.find('button').withAttribute('aria-label', /edit|Edit/);
  await t.click(editButton);

  const input = Selector('input');
  await t.typeText(input, newValue, { replace: true });

  await t.click(Selector('button').withText('Save'));

  return originalValue;
}

async function editGenderField(t: TestController, newGender: string): Promise<string | null> {
  const detailContainer = Selector('div').withText('Gender').parent('div');

  let originalValue = null;
  const valueElement = detailContainer.find('p').nth(1);
  if (await valueElement.exists) {
    originalValue = await valueElement.innerText;
  }

  const editButton = detailContainer.find('button').withAttribute('aria-label', /edit|Edit/);
  await t.click(editButton);

  await t.click(Selector('div[role="button"]'));
  await t.click(Selector('li').withText(newGender));

  await t.click(Selector('button').withText('Save'));

  return originalValue;
}

async function editDateField(
  t: TestController,
  newDate: { day: string; month: string; year: string },
): Promise<string | null> {
  const detailContainer = Selector('div').withText('Birth date').parent('div');

  let originalValue = null;
  const valueElement = detailContainer.find('p').nth(1);
  if (await valueElement.exists) {
    originalValue = await valueElement.innerText;
  }

  const editButton = detailContainer.find('button').withAttribute('aria-label', /edit|Edit/);
  await t.click(editButton);

  const dateInput = Selector('.MuiInputBase-input').nth(0);
  await t.click(dateInput);

  await t.click(Selector('button').withText(/\d{4}/));
  await t.click(Selector('div[role="button"]').withText(newDate.year));

  await t.click(
    Selector('[role="gridcell"]').withAttribute(
      'aria-label',
      new RegExp(`${newDate.month}.*${newDate.day}`),
    ),
  );

  await t.click(Selector('button').withText('Save'));

  return originalValue;
}

test('Edit, verify and revert all account details', async (t) => {
  await t.expect(Selector('body').exists).ok({ timeout: 5000 });

  await t.click(Selector('button').withText('About'));

  await t.wait(2000);

  const originalValues: Record<DetailType, string | null> = {} as Record<DetailType, string | null>;
  const detailTypes: DetailType[] = [
    'worksAt',
    'jobTitle',
    'college',
    'highSchool',
    'livesIn',
    'bornin',
    'email',
    'phone',
    'gender',
    'birthdate',
  ];

  for (const detailType of detailTypes) {
    if (await isDetailEditable(t, detailType)) {
      if (detailType === 'gender') {
        originalValues[detailType] = await editGenderField(t, 'Female');
      } else if (detailType === 'birthdate') {
        originalValues[detailType] = await editDateField(t, {
          day: '15',
          month: 'January',
          year: '1990',
        });
      } else {
        originalValues[detailType] = await editTextField(t, detailType, `Test ${detailType}`);
      }

      await t.wait(1000);
    }
  }

  await t.eval(() => location.reload());

  await t.wait(2000);
  await t.click(Selector('button').withText('About'));
  await t.wait(2000);

  for (const detailType of detailTypes) {
    if (originalValues[detailType] !== undefined) {
      const label = detailLabels[detailType];

      const detailContainer = Selector('div').withText(label).parent('div');
      const valueElement = detailContainer.find('p').nth(1);

      if (detailType !== 'birthdate') {
        if (detailType === 'gender') {
          await t.expect(valueElement.innerText).contains('Female');
        } else {
          await t.expect(valueElement.innerText).contains(`Test ${detailType}`);
        }
      } else {
        await t.expect(valueElement.exists).ok();
      }
    }
  }

  for (const detailType of detailTypes) {
    if (originalValues[detailType] !== undefined && (await isDetailEditable(t, detailType))) {
      if (detailType === 'gender') {
        const originalGender = originalValues[detailType] || 'Male';
        await editGenderField(t, originalGender);
      } else if (detailType === 'birthdate') {
        // Parse the original date string
        const originalDate = originalValues[detailType] || '';
        if (originalDate) {
          // Extract day, month, and year from the date string
          // Expected format: "January 1, 1990" or similar
          const dateParts = originalDate.match(/(\w+)\s+(\d+),\s+(\d+)/);

          if (dateParts) {
            const [_, month, day, year] = dateParts;

            await editDateField(t, {
              day: day,
              month: month,
              year: year,
            });
          } else {
            // If we can't parse the date, set a default value
            await editDateField(t, {
              day: '1',
              month: 'January',
              year: '1980',
            });
          }
        }
      } else {
        await editTextField(t, detailType, originalValues[detailType] || '');
      }

      await t.wait(1000);
    }
  }
});

// @ts-check
const { test, expect } = require("@playwright/test");
const data = require("./resources/data.json")

test("C8 - Access The Web Page", async ({ page }) => {
  // Go to web page".
  await page.goto("/");

  // Expect a title to contain "Sample Web Form".
  await expect(page).toHaveTitle("Sample Web Form");

});

test("C24 - UI Element Presence", async ({ page }) => {
  // Go to web page".
  await page.goto("/");

  // Ensure that the "Title" is present.
  await expect(page.locator('#title')).toBeVisible();

  // Ensure that the "First Name" is present.
  await expect(page.locator('#firstName')).toBeVisible();

  // Ensure that the "Middle Name" is present.
  await expect(page.locator('#middleName')).toBeVisible();

  // Ensure that the "Last Name" is present.
  await expect(page.locator('#lastName')).toBeVisible();

  // Ensure that the "Email" is present.
  await expect(page.locator('#email')).toBeVisible();

  // Ensure that the "Phone Number" is present.
  await expect(page.locator('#phone')).toBeVisible();

  // Ensure that the "Date of Birth" is present.
  await expect(page.locator('#dob')).toBeVisible();

  // Ensure that the "Gender" is present.
  await expect(page.locator('.gender-switch')).toBeVisible();

  // Ensure that the "Province" is present.
  await expect(page.locator('#province')).toBeVisible();

  // Ensure that the "City" is present.
  await expect(page.locator('#city')).toBeVisible();

  // Ensure that the "Submit" is present.
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test("C3 - Positive Case - Submit form success", async ({ page }) => {

  await page.goto("/");

  // Select title
  await page.getByLabel('Title*').selectOption(data.title);

  // Fill First Name
  await page.getByLabel('First Name*').fill(data.firstName);

  // Fill Middle Name
  await page.getByLabel('Middle Name*').fill(data.middleName);

  // Fill Last Name
  await page.getByLabel('Last Name*').fill(data.lastName);

  // Fill email
  await page.getByLabel('Email*').fill(data.email);

  // Fill Phone Number
  await page.getByLabel('Phone Number*').fill(data.phoneNumber);

  // Fill DOB
  await page.getByLabel('Date of Birth*').fill(data.dob);

  // Select gender
  await page.getByText('Male Female').click();

  // Select province
  await page.getByLabel('Address*').selectOption(data.province);

  // Select city
  await page.locator('#city').selectOption(data.city);

  // Click submit button and verifiy button functionality
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifiy prompt for submits successfully
  await expect(page.locator('text=User Information')).toBeVisible;
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${data.title} ${data.firstName} ${data.middleName} ${data.lastName}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${data.email}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${data.phoneNumber}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${data.province}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${data.city}`));

});

test("C16 - Negative Case - Submit form invalid email", async ({ page }) => {

  await page.goto("/");

  // Select title
  await page.getByLabel('Title*').selectOption(data.title);

  // Fill First Name
  await page.getByLabel('First Name*').fill(data.firstName);

  // Fill Middle Name
  await page.getByLabel('Middle Name*').fill(data.middleName);

  // Fill Last Name
  await page.getByLabel('Last Name*').fill(data.lastName);

  // Fill invalid email format
  await page.getByLabel('Email*').fill('test.gmail.com');

  // Fill Phone Number
  await page.getByLabel('Phone Number*').fill(data.phoneNumber);

  // Fill DOB
  await page.getByLabel('Date of Birth*').fill(data.dob);

  // Select gender
  await page.getByText('Male Female').click();

  // Select province
  await page.getByLabel('Address*').selectOption(data.province);

  // Select city
  await page.locator('#city').selectOption(data.city);

  // Click submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifiy can't proceed to submits and there is error notification
  await expect(page.getByText('Invalid email format')).toBeVisible;

});

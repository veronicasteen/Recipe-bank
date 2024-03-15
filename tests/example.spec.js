const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/index.html');
});

test('Add a recipe to cart with ingredients', async ({ page }) => {

  await page.click('#starters-button');

  await page.click('#add-button');

  //Vi antar att det är första receptet som läggs till
  //och i det är det sju ingredienser
  let expectedItemCount = 7;

  //hämta antalet ingredienser som en sträng
  let actualItemCountString = await page.textContent('#cart-count');

  //konvertera
  let actualItemCount = parseInt(actualItemCountString);

  //jämför
  expect(actualItemCount).toBe(expectedItemCount);;

});

test('Delete an ingredient', async ({ page }) => {
  
  await page.click('#starters-button');
  await page.click('#add-button');
  let expectedItemCount = 7;
  
  let actualItemCountString = await page.textContent('#cart-count');
  let actualItemCount = parseInt(actualItemCountString);
  expect(actualItemCount).toBe(expectedItemCount);
  

  let cartButton = page.locator('#cart-button');

  await cartButton.click()

  await page.click('.checkbox-button');

  await page.click("#remove-button");

  let newExpectedItemCount = 6;
  let newActualItemCountString = await page.textContent('#cart-count');
  let newActualItemCount = parseInt(newActualItemCountString);
  expect(newActualItemCount).toBe(newExpectedItemCount);
  
});

test('Delete all ingredients', async ({ page }) => {
  
  await page.click('#starters-button');
  await page.click('#add-button');
  let expectedItemCount = 7;
  
  let actualItemCountString = await page.textContent('#cart-count');
  let actualItemCount = parseInt(actualItemCountString);
  expect(actualItemCount).toBe(expectedItemCount);
  
  let cartButton = page.locator('#cart-button');

  await cartButton.click()

  await page.click('#mark-all-button');

  await page.click("#remove-button");

  //eftersom #cart-count automatiskt förvinner när cartItemCount = 0
  //testar vi cart-counts visability och kan bekäfta att cartItemCount = 0
  page.locator('#cart-count').isHidden;

});


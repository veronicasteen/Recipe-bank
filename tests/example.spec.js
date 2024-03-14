const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/index.html');
});

test('Add a recipe to cart with ingredients', async ({ page }) => {

  await page.click('#starters-button');

  await page.click('#add-button');

  const expectedItemCount = 7;

  //hämta ingredienser som en sträng
  const actualItemCountString = await page.textContent('#cart-count');

  //konvertera
  const actualItemCount = parseInt(actualItemCountString);

  //jämför
  expect(actualItemCount).toBe(expectedItemCount);;

});

// test('Delete an ingredient', async ({ page }) => {
  
//   let startersButtonSelector = '#starters-button';

//   await page.click(startersButtonSelector);

//   let addButtonSelector = '#add-button';

//   await page.click(addButtonSelector);

//   await page.click('#cart-count');

//   let shoppingBagLength = await page.$$eval('.shopping-list li', items => items.length);
//   expect(shoppingBagLength).toBe(7);
  
// });

// test('Delete all ingredients', async ({ page }) => {
  
//   let startersButtonSelector = '#starters-button';

//   await page.click(startersButtonSelector);

//   let addButtonSelector = '#add-button';

//   await page.click(addButtonSelector);

//   let cartButtonSelector= '#cart-count';

//   await page.click(cartButtonSelector)

//   let shoppingBagLength = await page.$$eval('#cart-count', items => items.length);
//   expect(shoppingBagLength).toBeGreaterThan(0);
  
// });


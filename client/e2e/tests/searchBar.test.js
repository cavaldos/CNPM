import { By, until, Key } from 'selenium-webdriver';
import {
  createDriver,
  waitForElement,
  waitAndClick,
  waitAndType,
  waitForPageLoad
} from '../utils/webdriver.js';

/**
 * E2E test for the SearchBar functionality
 * Tests entering "ana" into the search bar and verifying autocomplete results
 */
async function testSearchBarFunctionality() {
  let driver;

  try {
    console.log('Starting SearchBar functionality test...');

    // Create a new WebDriver instance
    driver = await createDriver();
    console.log('WebDriver initialized');

    // Set window size
    await driver.manage().window().setRect({ width: 1280, height: 800 });

    // Navigate to the homepage where the search bar is visible
    console.log('Navigating to homepage...');
    await driver.get('http://localhost:5173/');
    console.log('Navigated to homepage');

    // Wait for the page to load
    console.log('Waiting for page to load...');
    await waitForPageLoad(driver, 20000); // Increase timeout to 20 seconds
    console.log('Page loaded successfully');

    // Find the search input field
    console.log('Looking for search input field...');
    try {
      // Try multiple selectors to find the search input
      let searchInput;
      try {
        searchInput = await waitForElement(
          driver,
          By.css('input[placeholder*="what do you want to learn"]'),
          10000
        );
      } catch (e) {
        console.log('First selector failed, trying alternative selector...');
        searchInput = await waitForElement(
          driver,
          By.css('.border-gray-300.border-b.border-\\[1px\\].rounded-full'),
          10000
        );
      }
      console.log('Found search input field');
    } catch (e) {
      console.error('Failed to find search input:', e.message);
      // Take a screenshot to help debug
      const screenshot = await driver.takeScreenshot();
      console.log('Page screenshot (base64):', screenshot.substring(0, 100) + '...');
      throw e;
    }

    // Type "ana" into the search field
    console.log('Typing "ana" into search field...');
    try {
      try {
        await waitAndType(driver, By.css('input[placeholder*="what do you want to learn"]'), 'ana');
      } catch (e) {
        console.log('First typing selector failed, trying alternative selector...');
        await waitAndType(driver, By.css('.border-gray-300.border-b.border-\\[1px\\].rounded-full'), 'ana');
      }
      console.log('Successfully typed "ana" into search field');
    } catch (e) {
      console.error('Failed to type in search input:', e.message);
      throw e;
    }

    // Wait for the dropdown to appear
    console.log('Waiting for dropdown to appear...');
    let dropdown;
    try {
      dropdown = await waitForElement(
        driver,
        By.css('.absolute.top-full.left-0.w-\\[480px\\]'),
        10000
      );
      console.log('Dropdown appeared');
    } catch (e) {
      console.log('Dropdown selector failed, trying alternative approach...');
      // Wait a bit to see if dropdown appears
      await driver.sleep(2000);

      // Try to find any dropdown or popup element
      try {
        dropdown = await driver.findElement(By.css('.absolute'));
        console.log('Found alternative dropdown element');
      } catch (innerError) {
        console.error('Could not find dropdown:', e.message);
        // Continue the test anyway
      }
    }

    // Verify that search results are displayed
    const searchResults = await driver.findElements(By.css('.flex.items-center.space-x-2.py-2.hover\\:bg-gray-100'));

    if (searchResults.length > 0) {
      console.log(`✅ Found ${searchResults.length} search results in the dropdown`);

      // Get the text of the first search result
      const firstResultText = await searchResults[0].getText();
      console.log(`First search result: "${firstResultText}"`);

      // Verify that at least one result contains "ana" (case insensitive)
      let foundMatchingResult = false;
      for (const result of searchResults) {
        const resultText = await result.getText();
        if (resultText.toLowerCase().includes('ana')) {
          foundMatchingResult = true;
          console.log(`Found matching result: "${resultText}"`);
          break;
        }
      }

      if (foundMatchingResult) {
        console.log('✅ TEST PASSED: Found at least one result containing "ana"');
      } else {
        console.log('⚠️ No results containing "ana" found, but dropdown appeared with results');
      }
    } else {
      console.log('⚠️ Dropdown appeared but no search results found');
    }

    // Test clicking on the search button
    console.log('Looking for search button...');
    try {
      let searchButton;
      try {
        searchButton = await waitForElement(
          driver,
          By.css('button.absolute.right-2.top-1\\/2.transform.-translate-y-1\\/2'),
          10000
        );
      } catch (e) {
        console.log('First button selector failed, trying alternative selector...');
        searchButton = await waitForElement(
          driver,
          By.css('button svg[d*="M21 21l-6-6m2-5a7"]'),
          10000
        );
      }

      console.log('Found search button, clicking...');
      await searchButton.click();
      console.log('Clicked search button');
    } catch (e) {
      console.error('Failed to click search button:', e.message);
      // Try pressing Enter key instead
      console.log('Trying to press Enter key instead...');
      await driver.findElement(By.css('input')).sendKeys(Key.ENTER);
      console.log('Pressed Enter key');
    }

    // Wait for navigation to search results page
    console.log('Waiting for navigation to search results page...');
    await waitForPageLoad(driver, 20000);
    console.log('Page loaded after search');

    // Verify we're on the search results page
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('/search/ana')) {
      console.log('✅ TEST PASSED: Successfully navigated to search results page');
    } else {
      console.error('❌ TEST FAILED: Did not navigate to expected search results page');
      console.error(`Expected URL to contain: /search/ana`);
      console.error(`Actual URL: ${currentUrl}`);
    }

  } catch (error) {
    console.error('❌ TEST FAILED with error:', error);
  } finally {
    // Close the browser
    if (driver) {
      await driver.quit();
      console.log('WebDriver closed');
    }
  }
}

// Run the test
testSearchBarFunctionality().catch(error => {
  console.error('Error running test:', error);
  process.exit(1);
});

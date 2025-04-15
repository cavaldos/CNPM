import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

/**
 * Creates and returns a configured WebDriver instance
 * @returns {Promise<import('selenium-webdriver').WebDriver>} The configured WebDriver instance
 */
export async function createDriver() {
  // Set up Chrome options
  const options = new chrome.Options();
  
  // Uncomment the line below to run in headless mode (no browser UI)
  // options.addArguments('--headless');
  
  // Create and return the WebDriver
  return new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
}

/**
 * Waits for an element to be visible and returns it
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {import('selenium-webdriver').By} locator - The locator for the element
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<import('selenium-webdriver').WebElement>} The found element
 */
export async function waitForElement(driver, locator, timeout = 10000) {
  return driver.wait(until.elementLocated(locator), timeout);
}

/**
 * Waits for an element to be visible and clicks it
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {import('selenium-webdriver').By} locator - The locator for the element
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
export async function waitAndClick(driver, locator, timeout = 10000) {
  const element = await waitForElement(driver, locator, timeout);
  await element.click();
}

/**
 * Waits for an element to be visible, clears it, and types text into it
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {import('selenium-webdriver').By} locator - The locator for the element
 * @param {string} text - The text to type
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
export async function waitAndType(driver, locator, text, timeout = 10000) {
  const element = await waitForElement(driver, locator, timeout);
  await element.clear();
  await element.sendKeys(text);
}

/**
 * Waits for an element to be visible and returns its text
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {import('selenium-webdriver').By} locator - The locator for the element
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<string>} The text of the element
 */
export async function waitAndGetText(driver, locator, timeout = 10000) {
  const element = await waitForElement(driver, locator, timeout);
  return element.getText();
}

/**
 * Waits for a page to load by checking for the readyState to be 'complete'
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
export async function waitForPageLoad(driver, timeout = 10000) {
  await driver.wait(
    async () => {
      const readyState = await driver.executeScript('return document.readyState');
      return readyState === 'complete';
    },
    timeout,
    'Page did not load within the specified timeout'
  );
}

/**
 * Logs in a user using Firebase Google authentication
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {string} email - The email to use for login
 * @param {string} password - The password to use for login
 */
export async function loginWithGoogle(driver, email, password) {
  // This is a simplified example - actual implementation would depend on your app's login flow
  // Navigate to login page
  await driver.get('http://localhost:5173/login');
  
  // Click the Google login button
  await waitAndClick(driver, By.css('button[aria-label="Sign in with Google"]'));
  
  // Handle Google login popup
  // Note: This is complex and may require switching to a popup window
  // For testing purposes, you might want to use a test account or mock authentication
}

/**
 * Navigates to a course detail page
 * @param {import('selenium-webdriver').WebDriver} driver - The WebDriver instance
 * @param {string} courseId - The ID of the course to navigate to
 */
export async function navigateToCourseDetail(driver, courseId) {
  await driver.get(`http://localhost:5173/course-detail/${courseId}`);
  await waitForPageLoad(driver);
}

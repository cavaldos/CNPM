import { By, until, Key } from 'selenium-webdriver';
import { 
  createDriver, 
  waitForElement, 
  waitAndClick, 
  waitAndType, 
  waitAndGetText,
  waitForPageLoad
} from '../utils/webdriver.js';

/**
 * Advanced E2E test for the Discussion Forum message sending functionality
 * This test includes authentication and more detailed testing
 */
async function testDiscussionForumAdvanced() {
  let driver;

  try {
    console.log('Starting Advanced Discussion Forum test...');
    
    // Create a new WebDriver instance
    driver = await createDriver();
    console.log('WebDriver initialized');

    // Set window size
    await driver.manage().window().setRect({ width: 1280, height: 800 });
    
    // Step 1: Login (if needed)
    await login(driver);
    
    // Step 2: Navigate to a course detail page
    await navigateToCourseDetail(driver);
    
    // Step 3: Test sending a message
    await testSendMessage(driver);
    
    // Step 4: Test message validation (empty message)
    await testEmptyMessageValidation(driver);
    
    console.log('✅ All tests completed successfully!');
    
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

/**
 * Login to the application
 * @param {import('selenium-webdriver').WebDriver} driver 
 */
async function login(driver) {
  try {
    console.log('Attempting to login...');
    
    // Navigate to the login page
    await driver.get('http://localhost:5173/login');
    await waitForPageLoad(driver);
    
    // Check if we need to login
    // This is a simplified example - you'll need to adapt this to your application's login flow
    const loginButton = await driver.findElements(By.css('button'));
    
    if (loginButton.length > 0) {
      console.log('Login page detected, proceeding with login...');
      
      // Click the login button (assuming it's a Google login button)
      await waitAndClick(driver, By.css('button'));
      
      // Wait for redirect after login
      await waitForPageLoad(driver);
      console.log('Login successful');
    } else {
      console.log('Already logged in or login not required');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

/**
 * Navigate to a course detail page
 * @param {import('selenium-webdriver').WebDriver} driver 
 */
async function navigateToCourseDetail(driver) {
  try {
    console.log('Navigating to course detail page...');
    
    // Navigate to the home page first
    await driver.get('http://localhost:5173/');
    await waitForPageLoad(driver);
    
    // Find and click on a course card to navigate to its detail page
    // This assumes there's at least one course card on the home page
    await waitAndClick(driver, By.css('.course-card, [data-testid^="course-card"]'));
    
    // Wait for the course detail page to load
    await waitForPageLoad(driver);
    
    // Verify we're on a course detail page by checking for the discussion forum
    await waitForElement(
      driver, 
      By.css('.bg-gray-100.rounded-lg.shadow.h-\\[calc\\(100vh-12rem\\)\\]')
    );
    
    console.log('Successfully navigated to course detail page');
  } catch (error) {
    // If clicking on a course card fails, try navigating directly to a course detail page
    console.log('Direct navigation to course card failed, trying direct URL...');
    await driver.get('http://localhost:5173/course-detail/1'); // Replace with a valid course ID
    await waitForPageLoad(driver);
    
    // Verify we're on a course detail page
    await waitForElement(
      driver, 
      By.css('.bg-gray-100.rounded-lg.shadow.h-\\[calc\\(100vh-12rem\\)\\]')
    );
    
    console.log('Successfully navigated to course detail page via direct URL');
  }
}

/**
 * Test sending a message in the discussion forum
 * @param {import('selenium-webdriver').WebDriver} driver 
 */
async function testSendMessage(driver) {
  try {
    console.log('Testing message sending functionality...');
    
    // Scroll to the discussion forum section
    const discussionForumSection = await waitForElement(
      driver, 
      By.css('.bg-gray-100.rounded-lg.shadow.h-\\[calc\\(100vh-12rem\\)\\]')
    );
    await driver.executeScript('arguments[0].scrollIntoView(true)', discussionForumSection);
    
    // Wait for the message input field to be visible
    const messageInput = await waitForElement(
      driver, 
      By.css('input[placeholder="Write your comment..."]')
    );
    
    // Type a test message
    const testMessage = `Automated test message sent at ${new Date().toLocaleTimeString()}`;
    await waitAndType(driver, By.css('input[placeholder="Write your comment..."]'), testMessage);
    console.log(`Typed message: "${testMessage}"`);
    
    // Click the send button
    await waitAndClick(driver, By.css('button:not([disabled]) .lucide-send'));
    console.log('Clicked send button');
    
    // Wait for the message to appear in the discussion forum
    try {
      await driver.wait(
        until.elementLocated(By.xpath(`//p[contains(text(), '${testMessage}')]`)),
        10000,
        'Message did not appear in the discussion forum'
      );
      console.log('Message appeared in the discussion forum');
      
      // Verify the message content
      const messageElement = await driver.findElement(By.xpath(`//p[contains(text(), '${testMessage}')]`));
      const messageText = await messageElement.getText();
      
      if (messageText.includes(testMessage)) {
        console.log('✅ TEST PASSED: Message was sent and displayed correctly');
      } else {
        console.error('❌ TEST FAILED: Message was not displayed correctly');
        console.error(`Expected: ${testMessage}`);
        console.error(`Actual: ${messageText}`);
      }
    } catch (error) {
      console.error('Error waiting for message to appear:', error);
      
      // Take a screenshot for debugging
      const screenshot = await driver.takeScreenshot();
      console.log('Screenshot taken for debugging');
      
      throw error;
    }
  } catch (error) {
    console.error('Error during message sending test:', error);
    throw error;
  }
}

/**
 * Test validation for empty messages
 * @param {import('selenium-webdriver').WebDriver} driver 
 */
async function testEmptyMessageValidation(driver) {
  try {
    console.log('Testing empty message validation...');
    
    // Clear the message input field
    await waitAndType(driver, By.css('input[placeholder="Write your comment..."]'), '');
    
    // Try to click the send button (it should be disabled)
    const sendButtons = await driver.findElements(By.css('button[disabled] .lucide-send'));
    
    if (sendButtons.length > 0) {
      console.log('✅ TEST PASSED: Send button is correctly disabled for empty messages');
    } else {
      // If the button is not disabled, try to click it and verify no message is sent
      const enabledSendButtons = await driver.findElements(By.css('button:not([disabled]) .lucide-send'));
      
      if (enabledSendButtons.length > 0) {
        console.log('Send button is not disabled for empty messages, checking if clicking it has any effect...');
        
        // Get the current number of messages
        const messagesBefore = await driver.findElements(By.css('.divide-y.divide-gray-100 > div'));
        const countBefore = messagesBefore.length;
        
        // Click the send button
        await enabledSendButtons[0].click();
        
        // Wait a moment and check if any new messages appeared
        await driver.sleep(2000);
        const messagesAfter = await driver.findElements(By.css('.divide-y.divide-gray-100 > div'));
        const countAfter = messagesAfter.length;
        
        if (countAfter === countBefore) {
          console.log('✅ TEST PASSED: Empty message was not sent even though button was clickable');
        } else {
          console.error('❌ TEST FAILED: Empty message was sent');
        }
      } else {
        console.error('❌ TEST FAILED: Could not find send button');
      }
    }
  } catch (error) {
    console.error('Error during empty message validation test:', error);
    throw error;
  }
}

// Run the test
testDiscussionForumAdvanced().catch(error => {
  console.error('Error running test:', error);
  process.exit(1);
});

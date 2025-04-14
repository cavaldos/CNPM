import { By, until } from 'selenium-webdriver';
import { 
  createDriver, 
  waitForElement, 
  waitAndClick, 
  waitAndType, 
  waitAndGetText,
  waitForPageLoad,
  navigateToCourseDetail
} from '../utils/webdriver.js';

/**
 * E2E test for the Discussion Forum message sending functionality
 */
async function testDiscussionForumMessageSending() {
  let driver;

  try {
    console.log('Starting Discussion Forum message sending test...');
    
    // Create a new WebDriver instance
    driver = await createDriver();
    console.log('WebDriver initialized');

    // Set window size
    await driver.manage().window().setRect({ width: 1280, height: 800 });
    
    // Navigate to a course detail page (replace with an actual course ID from your system)
    // You may need to adjust this based on your application's URL structure
    const courseId = 1; // Replace with a valid course ID
    await navigateToCourseDetail(driver, courseId);
    console.log(`Navigated to course detail page for course ID: ${courseId}`);
    
    // Wait for the page to load
    await waitForPageLoad(driver);
    
    // Scroll to the discussion forum section
    const discussionForumSection = await waitForElement(
      driver, 
      By.css('.bg-gray-100.rounded-lg.shadow.h-\\[calc\\(100vh-12rem\\)\\]')
    );
    await driver.executeScript('arguments[0].scrollIntoView(true)', discussionForumSection);
    console.log('Scrolled to discussion forum section');
    
    // Wait for the message input field to be visible
    const messageInput = await waitForElement(
      driver, 
      By.css('input[placeholder="Write your comment..."]')
    );
    console.log('Found message input field');
    
    // Type a test message
    const testMessage = `Test message sent at ${new Date().toLocaleTimeString()}`;
    await waitAndType(driver, By.css('input[placeholder="Write your comment..."]'), testMessage);
    console.log(`Typed message: "${testMessage}"`);
    
    // Click the send button
    await waitAndClick(driver, By.css('button[disabled=false] .lucide-send'));
    console.log('Clicked send button');
    
    // Wait for the message to appear in the discussion forum
    // This assumes the message appears at the top of the list
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
testDiscussionForumMessageSending().catch(error => {
  console.error('Error running test:', error);
  process.exit(1);
});

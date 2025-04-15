# End-to-End (E2E) Tests

This directory contains end-to-end tests using Selenium WebDriver to automate browser interactions and test the application's functionality from a user's perspective.

## Setup

1. Install the required dependencies:

```bash
npm install
```

This will install Selenium WebDriver and ChromeDriver as specified in the project's package.json.

## Running Tests

To run the basic discussion forum test:

```bash
npm run test:e2e
```

To run the advanced discussion forum test:

```bash
node e2e/tests/discussionForum.advanced.test.js
```

## Test Structure

The e2e tests are organized as follows:

- `e2e/utils/`: Contains utility functions for working with Selenium WebDriver
- `e2e/tests/`: Contains the actual test files

## Available Tests

### Discussion Forum Tests

- `discussionForum.test.js`: Basic test for sending messages in the discussion forum
- `discussionForum.advanced.test.js`: Advanced test with authentication and more detailed testing

## Writing New Tests

To write new E2E tests:

1. Create a new test file in the `e2e/tests/` directory
2. Import the necessary utilities from `e2e/utils/webdriver.js`
3. Structure your test with clear steps and error handling
4. Add appropriate console logging for debugging

Example structure for a new test:

```javascript
import { By } from 'selenium-webdriver';
import { 
  createDriver, 
  waitForElement, 
  waitAndClick 
} from '../utils/webdriver.js';

async function myNewTest() {
  let driver;

  try {
    console.log('Starting my new test...');
    
    // Create a new WebDriver instance
    driver = await createDriver();
    
    // Test steps go here...
    
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ TEST FAILED with error:', error);
  } finally {
    // Close the browser
    if (driver) {
      await driver.quit();
    }
  }
}

// Run the test
myNewTest().catch(error => {
  console.error('Error running test:', error);
  process.exit(1);
});
```

## Troubleshooting

- **ChromeDriver version mismatch**: Make sure your ChromeDriver version matches your Chrome browser version. You may need to update the ChromeDriver version in package.json.
- **Element not found**: If tests fail because elements aren't found, check if selectors have changed in the application.
- **Authentication issues**: If tests require authentication, make sure the login flow is correctly implemented in the test.

## Best Practices

1. Keep tests independent and isolated
2. Use descriptive names for test functions and variables
3. Add appropriate wait conditions to handle asynchronous operations
4. Include proper error handling and logging
5. Clean up resources (like the WebDriver) in a finally block
6. Take screenshots on failure for debugging

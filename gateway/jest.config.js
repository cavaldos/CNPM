module.exports = {
    roots: ['<rootDir>', '<rootDir>/__test__'], // Include both root and __test__ directory
    transform: {
        '^.+\\.ts?$': 'ts-jest', // Use ts-jest to compile TypeScript files
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]s$', // Fixed regex to match your test files
    moduleFileExtensions: ['ts', 'js', 'json', 'node', 'jsx', 'tsx'], // Supported file extensions
    verbose: true, // Show details when running tests
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1' // Help resolve imports from src directory
    }
};
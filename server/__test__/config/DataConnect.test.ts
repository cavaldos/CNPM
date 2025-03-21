import DataConnect from '../../src/config/DataConnect';

// Mock SQL Server
jest.mock('mssql', () => {
    const mockRequest = {
        query: jest.fn().mockResolvedValue({ recordset: [{ id: 1, name: 'Test User' }] }),
        input: jest.fn(),
        execute: jest.fn().mockResolvedValue({ recordset: [{ id: 1, name: 'Test User' }] }),
    };

    const mockPool = {
        request: jest.fn().mockReturnValue(mockRequest),
        connected: true,
        connect: jest.fn().mockResolvedValue(undefined),
        close: jest.fn().mockResolvedValue(undefined),
    };

    return {
        ConnectionPool: jest.fn().mockImplementation(() => mockPool),
        config: jest.fn(),
    };
});

describe('DataConnect', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('execute method', () => {
        it('should execute query to select from User table and return an array', async () => {
            const result = await DataConnect.execute('select * from [User]');

            // Check if result is an array
            expect(Array.isArray(result)).toBe(true);

            // Verify we got expected data
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });
    });
});
import DataConnect from '../../src/config/DataConnect';
import * as sql from 'mssql';

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
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });

        it('should throw error when query fails', async () => {
            const mockPool = new sql.ConnectionPool({});
            mockPool.request().query.mockRejectedValue(new Error('Query failed'));
            await expect(DataConnect.execute('invalid query')).rejects.toThrow('Query failed');
        });
    });

    describe('executeWithParams method', () => {
        it('should execute parameterized query and return results', async () => {
            const params = { userId: 1, name: 'John' };
            const result = await DataConnect.executeWithParams('SELECT * FROM Users WHERE id = @userId AND name = @name', params);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });

        it('should handle empty params object', async () => {
            const result = await DataConnect.executeWithParams('SELECT * FROM Users', {});
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });

        it('should throw error when query with params fails', async () => {
            const mockPool = new sql.ConnectionPool({});
            mockPool.request().query.mockRejectedValue(new Error('Params query failed'));
            await expect(DataConnect.executeWithParams('invalid query', { id: 1 })).rejects.toThrow('Query failed');
        });
    });

    describe('executeProcedure method', () => {
        it('should execute stored procedure with parameters', async () => {
            const result = await DataConnect.executeProcedure('GetUserById', { userId: 1 });
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });

        it('should execute stored procedure without parameters', async () => {
            const result = await DataConnect.executeProcedure('GetAllUsers', {});
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
        });

        it('should throw error when procedure execution fails', async () => {
            const mockPool = new sql.ConnectionPool({});
            mockPool.request().execute.mockRejectedValue(new Error('Procedure failed'));
            await expect(DataConnect.executeProcedure('InvalidProcedure', {})).rejects.toThrow('Procedure failed');
        });
    });

    describe('connection management', () => {
        it('should open connection successfully', async () => {
            await DataConnect.open();
            const mockPool = new sql.ConnectionPool({});
            expect(mockPool.connect).toHaveBeenCalled();
        });

        it('should close connection successfully', async () => {
            await DataConnect.close();
            const mockPool = new sql.ConnectionPool({});
            expect(mockPool.close).toHaveBeenCalled();
        });

        it('should handle connection errors', async () => {
            const mockPool = new sql.ConnectionPool({});
            mockPool.connect.mockRejectedValue(new Error('Connection failed'));
            await expect(DataConnect.open()).rejects.toThrow('Connection failed');
        });
    });
});
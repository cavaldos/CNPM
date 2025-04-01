import DataConnect from '../../src/config/DataConnect';
import * as sql from 'mssql';

// Mock SQL Server
jest.mock('mssql', () => {
    const mockRequest = {
        query: jest.fn().mockResolvedValue({ recordset: [{ id: 1, name: 'Test User' }] }),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ recordset: [{ id: 1, name: 'Test User' }] }),
    };

    const mockPool = {
        request: jest.fn().mockReturnValue(mockRequest),
        connected: false,
        connect: jest.fn().mockImplementation(() => {
            mockPool.connected = true; // Cập nhật trạng thái khi connect
            return Promise.resolve(undefined);
        }),
        close: jest.fn().mockImplementation(() => {
            mockPool.connected = false; // Cập nhật trạng thái khi close
            return Promise.resolve(undefined);
        }),
    };

    return {
        ConnectionPool: jest.fn().mockImplementation(() => mockPool),
        config: jest.fn(),
    };
});

describe('DataConnect', () => {
    let mockPool: any;

    beforeAll(() => {
        mockPool = new sql.ConnectionPool({ server: 'mock-server' });
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockPool.connected = false; // Reset trạng thái sau mỗi test
    });

    describe('execute method', () => {
        it('should execute query to select from User table and return an array', async () => {
            const result = await DataConnect.execute('select * from [User]');
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
            expect(mockPool.request().query).toHaveBeenCalledWith('USE CourseDB; select * from [User]');
            expect(mockPool.connect).toHaveBeenCalled();
        });

        it('should throw error when query fails', async () => {
            mockPool.request().query.mockRejectedValueOnce(new Error('Query failed'));
            await expect(DataConnect.execute('invalid query')).rejects.toThrow('Query failed: Query failed');
        });
    });

    describe('executeWithParams method', () => {
        it('should execute parameterized query and return results', async () => {
            const params = { userId: 1, name: 'John' };
            const result = await DataConnect.executeWithParams('SELECT * FROM Users WHERE id = @userId AND name = @name', params);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
            expect(mockPool.request().query).toHaveBeenCalledWith('USE CourseDB; SELECT * FROM Users WHERE id = @userId AND name = @name');
            expect(mockPool.connect).toHaveBeenCalled();
        });

        it('should handle empty params object', async () => {
            const result = await DataConnect.executeWithParams('SELECT * FROM Users', {});
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
            expect(mockPool.request().query).toHaveBeenCalledWith('USE CourseDB; SELECT * FROM Users');
            expect(mockPool.connect).toHaveBeenCalled();
        });

        it('should throw error when query with params fails', async () => {
            mockPool.request().query.mockRejectedValueOnce(new Error('Params query failed'));
            await expect(DataConnect.executeWithParams('invalid query', { id: 1 })).rejects.toThrow('Query failed: Params query failed');
        });
    });

    describe('executeProcedure method', () => {
        it('should execute stored procedure with parameters', async () => {
            const result = await DataConnect.executeProcedure('GetUserById', { userId: 1 });
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
            expect(mockPool.request().execute).toHaveBeenCalledWith('GetUserById');
            expect(mockPool.connect).toHaveBeenCalled();
            expect(mockPool.close).toHaveBeenCalled();
        });

        it('should execute stored procedure without parameters', async () => {
            const result = await DataConnect.executeProcedure('GetAllUsers', {});
            expect(Array.isArray(result)).toEqual(true);
            expect(result).toEqual([{ id: 1, name: 'Test User' }]);
            expect(mockPool.request().execute).toHaveBeenCalledWith('GetAllUsers');
            expect(mockPool.connect).toHaveBeenCalled();
            expect(mockPool.close).toHaveBeenCalled();
        });

        it('should throw error when procedure execution fails', async () => {
            mockPool.request().execute.mockRejectedValueOnce(new Error('Procedure failed'));
            await expect(DataConnect.executeProcedure('InvalidProcedure', {})).rejects.toThrow('Procedure failed: Procedure failed');
            expect(mockPool.close).toHaveBeenCalled();
        });
    });

    describe('connection management', () => {
        it('should open connection successfully', async () => {
            await DataConnect.open();
            expect(mockPool.connect).toHaveBeenCalled();
            expect(mockPool.connected).toBe(true);
        });

        it('should close connection successfully', async () => {
            await DataConnect.open(); // Mở kết nối trước
            await DataConnect.close();
            expect(mockPool.close).toHaveBeenCalled();
            expect(mockPool.connected).toBe(false);
        });

        it('should handle connection errors without throwing', async () => {
            mockPool.connect.mockRejectedValueOnce(new Error('Connection failed'));
            await DataConnect.open(); // Không throw, chỉ log lỗi
            expect(mockPool.connect).toHaveBeenCalled();
            expect(mockPool.connected).toBe(false);
        });
    });
});
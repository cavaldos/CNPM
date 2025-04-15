import portfinder from 'portfinder';
import app from '../app';
import getIPAddresses from '../config/IP';
import { Server } from 'http';

// Mock các dependencies
jest.mock('../app');
jest.mock('../config/IP');
jest.mock('portfinder');
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Server Setup', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    process.env.PORT = '5001'; // Mock PORT từ env
    (getIPAddresses.IP as jest.Mock).mockReturnValue('192.168.1.1');
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should start server on the specified port', async () => {
    const mockListen = jest.fn((port, host, callback) => {
      callback();
      return { on: jest.fn() } as unknown as Server;
    });
    (app.listen as jest.Mock) = mockListen;
    (portfinder.getPortPromise as jest.Mock).mockResolvedValue(5001);

    await import('../src/server'); // Trigger server.ts

    expect(portfinder.getPortPromise).toHaveBeenCalledWith({ port: 5001 });
    expect(mockListen).toHaveBeenCalledWith(5001, '0.0.0.0', expect.any(Function));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:5001'),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('http://192.168.1.1:5001'),
    );
  });

  it('should handle port finding errors', async () => {
    (portfinder.getPortPromise as jest.Mock).mockRejectedValue(new Error('Port unavailable'));

    await import('../src/server'); // Trigger server.ts

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Could not find an open port: Error: Port unavailable'),
    );
  });

  it('should log server errors', async () => {
    const mockServer = {
      on: jest.fn((event, callback) => {
        if (event === 'error') callback(new Error('Server error'));
      }),
    };
    (app.listen as jest.Mock).mockReturnValue(mockServer);
    (portfinder.getPortPromise as jest.Mock).mockResolvedValue(5001);

    await import('../server'); // Trigger server.ts

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Error: Server error');
  });
});
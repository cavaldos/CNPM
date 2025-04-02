import request from 'supertest';
import express from 'express';
import app from '../app'; // Import app từ app.ts
import DataConnect from '../config/DataConnect'; // Import DataConnect từ config
import routers from '../api/routes'; // Import routers từ api/routes

// Mock các dependencies
jest.mock('../config/DataConnect');
jest.mock('../api/routes');

describe('App Configuration', () => {
  let testApp: express.Express;

  beforeEach(() => {
    testApp = express();
    testApp.use(express.json());
    testApp.use(routers); // Sử dụng router đã mock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB on startup', () => {
    const mockOpen = jest.fn();
    (DataConnect.open as jest.Mock).mockImplementation(mockOpen);
    require('../src/app'); // Trigger file app.ts
    expect(mockOpen).toHaveBeenCalled();
  });

  it('should configure CORS correctly', async () => {
    const response = await request(app)
      .get('/')
      .set('Origin', 'http://example.com');
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toContain('GET');
  });

  it('should use JSON middleware', async () => {
    testApp.post('/test', (req, res) => {
      res.json({ body: req.body });
    });
    const response = await request(testApp)
      .post('/test')
      .send({ key: 'value' })
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ body: { key: 'value' } });
  });

  it('should use helmet for security', () => {
    const helmetSpy = jest.spyOn(require('helmet'), 'default');
    require('../app'); // Trigger app.ts
    expect(helmetSpy).toHaveBeenCalled();
  });

  it('should use morgan for logging', () => {
    const morganSpy = jest.spyOn(require('morgan'), 'default');
    require('../app'); // Trigger app.ts
    expect(morganSpy).toHaveBeenCalledWith('tiny');
  });
});
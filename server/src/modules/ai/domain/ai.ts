/**
 * AI Domain Entity
 * 
 * This file defines the AI-related domain entities and value objects.
 */

// AI Message entity
export class AIMessage {
  private _message: string;
  private _response: string;
  private _timestamp: Date;

  constructor(message: string, response: string, timestamp: Date = new Date()) {
    this._message = message;
    this._response = response;
    this._timestamp = timestamp;
  }

  // Getters
  get message(): string {
    return this._message;
  }

  get response(): string {
    return this._response;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  // Factory method
  static create(data: any): AIMessage {
    return new AIMessage(
      data.message,
      data.response,
      data.timestamp || new Date()
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      message: this._message,
      response: this._response,
      timestamp: this._timestamp
    };
  }
}

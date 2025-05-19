import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  public static lastError: string | null = null;

  constructor(private ngZone: NgZone) {}

  handleError(error: any): void {
    // Save the error message globally
    GlobalErrorHandler.lastError = error?.message || error?.toString() || 'Unknown error';
    // Optionally log to console or send to server
    console.error('Global Error:', error);
  }
}
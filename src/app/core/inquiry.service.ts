import { Injectable } from '@angular/core';

export interface Inquiry {
  intent: 'inquiry' | 'suggestion';
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class InquiryService {
  /**
   * The house desk is not connected yet.
   * Replace this method when the Swagger contract is available.
   */
  submit(_note: Inquiry): boolean {
    return false;
  }
}

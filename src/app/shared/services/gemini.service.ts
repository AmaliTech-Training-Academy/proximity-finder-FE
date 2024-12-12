import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  apiKey = environment.geminiAiKey;
  genAI: GoogleGenerativeAI = new GoogleGenerativeAI(this.apiKey);

  generatedResponseSubject = new BehaviorSubject('');
  generatedResponse$ = this.generatedResponseSubject.asObservable();

  constructor() {}

  async generateDescription(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const results = await model.generateContent(prompt);

    const generatedResponse = results.response.text();

    this.generatedResponseSubject.next(generatedResponse);
  }
}

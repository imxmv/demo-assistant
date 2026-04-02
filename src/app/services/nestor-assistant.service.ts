import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface DemoAssistantPayload {
  taskLink: string;
  context: string;
  completedWork: string;
  impact: string;
}

@Injectable({
  providedIn: 'root',
})
export class NestorAssistantService {
  generateSpeechDraft(payload: DemoAssistantPayload): Observable<string> {
    const draft = [
      'Это заглушка сервиса генерации ответа. Здесь будет текст от внутренней AI модели.',
      `Сначала обозначьте задачу: ${payload.taskLink}.`,
      `Во вводной части раскройте контекст: ${payload.context}`,
      `Затем коротко перечислите сделанное: ${payload.completedWork}`,
      `В финале зафиксируйте ценность результата: ${payload.impact}`,
      'После подключения реального API замените этот шаблон на запрос к вашей модели.',
    ].join('\n\n');

    return of(draft).pipe(delay(1200));
  }
}

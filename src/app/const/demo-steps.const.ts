import { DemoStep } from '../models/demo-flow.models';

export const DEMO_STEPS: readonly DemoStep[] = [
  {
    key: 'taskLink',
    title: 'Ссылка на задачу',
    question:
      'Укажите ссылку на задачу или краткое название, чтобы зафиксировать контекст выступления.',
    placeholder:
      'Например: DSG-2481 / https://jira.example.com/browse/DSG-2481',
    controlType: 'input',
  },
  {
    key: 'context',
    title: 'Вводная часть',
    question:
      'О чем задача, зачем мы ее делаем и что произойдет, если не довести ее до результата?',
    placeholder:
      'Опишите проблему, цель и риски, если задачу не выполнить.',
    controlType: 'textarea',
  },
  {
    key: 'completedWork',
    title: 'Что сделали',
    question:
      'Сформулируйте, какие изменения, шаги или решения были реализованы.',
    placeholder:
      'Перечислите ключевые действия, решения и доработки.',
    controlType: 'textarea',
  },
  {
    key: 'impact',
    title: 'Что это нам дало',
    question:
      'Какой эффект получился: для пользователя, команды, продукта или процесса?',
    placeholder: 'Опишите итог, эффект и полезность результата.',
    controlType: 'textarea',
  },
];

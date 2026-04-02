export type ScreenState = 'welcome' | 'form' | 'result';
export type StepKey = 'taskLink' | 'context' | 'completedWork' | 'impact';
export type CopyTarget = 'user' | 'nestor';

export interface DemoStep {
  readonly key: StepKey;
  readonly title: string;
  readonly question: string;
  readonly placeholder: string;
  readonly controlType: 'input' | 'textarea';
}

export type DemoFormValue = Record<StepKey, string>;

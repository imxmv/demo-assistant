import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TuiAppearance, TuiRoot } from '@taiga-ui/core';
import { DEMO_STEPS } from './const/demo-steps.const';
import { ResultsScreenComponent } from './components/results-screen/results-screen.component';
import { StepFormComponent } from './components/step-form/step-form.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { WorkflowHeaderComponent } from './components/workflow-header/workflow-header.component';
import {
  CopyTarget,
  DemoFormValue,
  ScreenState,
  StepKey,
} from './models/demo-flow.models';
import {
  DemoAssistantPayload,
  NestorAssistantService,
} from './services/nestor-assistant.service';

@Component({
  selector: 'app-root',
  imports: [
    TuiAppearance,
    TuiRoot,
    ResultsScreenComponent,
    StepFormComponent,
    WelcomeScreenComponent,
    WorkflowHeaderComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly steps = DEMO_STEPS;

  private readonly nestorAssistantService = inject(NestorAssistantService);

  protected readonly screen = signal<ScreenState>('welcome');
  protected readonly currentStepIndex = signal(0);
  protected readonly isGenerating = signal(false);
  protected readonly nestorText = signal('');
  protected readonly copiedTarget = signal<CopyTarget | null>(null);
  protected readonly form = signal<DemoFormValue>(this.createInitialForm());

  protected readonly showWorkflow = computed(() => this.screen() !== 'welcome');
  protected readonly currentStep = computed(
    () => this.steps[this.currentStepIndex()],
  );
  protected readonly currentValue = computed(() =>
    this.formValue(this.currentStep().key),
  );
  protected readonly isLastStep = computed(
    () => this.currentStepIndex() === this.steps.length - 1,
  );
  protected readonly progressValue = computed(() => this.currentStepIndex() + 1);
  protected readonly canMoveForward = computed(
    () => this.formValue(this.currentStep().key).trim().length > 0,
  );
  protected readonly compiledUserText = computed(() =>
    this.steps
      .map((step) => `${step.title}\n${this.formValue(step.key)}`)
      .join('\n\n'),
  );

  protected startFlow(): void {
    this.screen.set('form');
    this.currentStepIndex.set(0);
  }

  protected goBack(): void {
    if (this.currentStepIndex() === 0) {
      return;
    }

    this.currentStepIndex.update((index) => index - 1);
  }

  protected goForward(): void {
    if (!this.canMoveForward() || this.isLastStep()) {
      return;
    }

    this.currentStepIndex.update((index) => index + 1);
  }

  protected goToStep(index: number): void {
    if (index > this.currentStepIndex()) {
      return;
    }

    this.currentStepIndex.set(index);
  }

  protected updateField(key: StepKey, value: string): void {
    this.form.update((current) => ({
      ...current,
      [key]: value,
    }));
  }

  protected finishFlow(): void {
    if (!this.canMoveForward()) {
      return;
    }

    this.screen.set('result');
    this.isGenerating.set(true);
    this.nestorText.set('');

    const payload: DemoAssistantPayload = {
      taskLink: this.formValue('taskLink'),
      context: this.formValue('context'),
      completedWork: this.formValue('completedWork'),
      impact: this.formValue('impact'),
    };

    this.nestorAssistantService.generateSpeechDraft(payload).subscribe({
      next: (value) => {
        this.nestorText.set(value);
        this.isGenerating.set(false);
      },
      error: () => {
        this.nestorText.set(
          'Не удалось получить ответ от AI-сервиса. Здесь можно обработать ошибку после подключения реального API.',
        );
        this.isGenerating.set(false);
      },
    });
  }

  protected restartFlow(): void {
    this.form.set(this.createInitialForm());
    this.currentStepIndex.set(0);
    this.nestorText.set('');
    this.isGenerating.set(false);
    this.copiedTarget.set(null);
    this.screen.set('form');
  }

  protected copyIcon(target: CopyTarget): string {
    return this.copiedTarget() === target ? '@tui.check' : '@tui.copy';
  }

  protected async copyText(target: CopyTarget): Promise<void> {
    const value =
      target === 'user' ? this.compiledUserText() : this.nestorText().trim();

    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    this.copiedTarget.set(target);

    window.setTimeout(() => {
      if (this.copiedTarget() === target) {
        this.copiedTarget.set(null);
      }
    }, 1500);
  }

  private formValue(key: StepKey): string {
    return this.form()[key];
  }

  private createInitialForm(): DemoFormValue {
    return {
      taskLink: '',
      context: '',
      completedWork: '',
      impact: '',
    };
  }
}

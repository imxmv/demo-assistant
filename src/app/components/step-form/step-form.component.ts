import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { DemoStep, StepKey } from '../../models/demo-flow.models';

@Component({
  selector: 'app-step-form',
  imports: [
    FormsModule,
    TuiButton,
    TuiTextarea,
    TuiTextfield,
  ],
  templateUrl: './step-form.component.html',
  styleUrl: './step-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFormComponent {
  readonly step = input.required<DemoStep>();
  readonly stepIndex = input.required<number>();
  readonly isFirstStep = input.required<boolean>();
  readonly isLastStep = input.required<boolean>();
  readonly value = input.required<string>();
  readonly canMoveForward = input.required<boolean>();

  readonly fieldChanged = output<{ key: StepKey; value: string }>();
  readonly back = output<void>();
  readonly next = output<void>();
  readonly finish = output<void>();
  readonly restart = output<void>();
}

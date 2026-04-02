import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { TuiProgress, TuiStepper } from '@taiga-ui/kit';
import { DemoStep } from '../../models/demo-flow.models';

@Component({
  selector: 'app-workflow-header',
  imports: [TuiAppearance, TuiProgress, TuiStepper],
  templateUrl: './workflow-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowHeaderComponent {
  readonly steps = input.required<readonly DemoStep[]>();
  readonly currentStepIndex = input.required<number>();
  readonly progressValue = input.required<number>();
  readonly stepSelected = output<number>();

  protected stepState(index: number): 'normal' | 'pass' {
    return index < this.currentStepIndex() ? 'pass' : 'normal';
  }
}

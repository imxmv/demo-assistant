import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TuiAppearance, TuiButton, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { CopyTarget, DemoFormValue, DemoStep } from '../../models/demo-flow.models';

@Component({
  selector: 'app-results-screen',
  imports: [TuiAppearance, TuiButton, TuiIcon, TuiLoader],
  templateUrl: './results-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsScreenComponent {
  readonly steps = input.required<readonly DemoStep[]>();
  readonly form = input.required<DemoFormValue>();
  readonly nestorText = input.required<string>();
  readonly isGenerating = input.required<boolean>();
  readonly userCopyIcon = input.required<string>();
  readonly nestorCopyIcon = input.required<string>();

  readonly restart = output<void>();
  readonly copy = output<CopyTarget>();
}

import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-welcome-screen',
  imports: [TuiAppearance, TuiButton],
  templateUrl: './welcome-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeScreenComponent {
  readonly start = output<void>();
}

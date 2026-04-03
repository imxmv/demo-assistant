import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-welcome-screen',
  imports: [TuiButton],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeScreenComponent {
  readonly start = output<void>();
}

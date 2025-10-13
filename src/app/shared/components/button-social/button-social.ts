import { Component, input, output } from '@angular/core';
import { GoogleIcon } from "@src/app/icon/google-icon/google-icon";
import { FacebookIcon } from "@src/app/icon/facebook-icon/facebook-icon";

@Component({
  selector: 'app-button-social',
  imports: [GoogleIcon, FacebookIcon],
  templateUrl: './button-social.html',
})
export class ButtonSocial {
  providers = {
    GOOGLE: 'Google',
    FACEBOOK: 'Facebook',
  }
  provider = input.required<'Google' | 'Facebook'>();

  authClick = output<void>();
}

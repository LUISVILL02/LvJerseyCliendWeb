import { Component, inject, ChangeDetectionStrategy, viewChildren, signal, computed } from '@angular/core';
import { FormBuilder, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from "@src/app/shared/components/input/input";
import { ButtonGeneric } from "@src/app/shared/components/button-generic/button-generic";
import { RegisterApi } from '../../services/register-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification-code',
  imports: [Input, ReactiveFormsModule, ButtonGeneric],
  templateUrl: './email-verification-code.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerificationCode {

  private registerApi = inject(RegisterApi);
  private fb = inject(FormBuilder);
  private activateRoute = inject(ActivatedRoute);

  array = Array.from({ length: 6 }, (_, i) => i);

  inputs = viewChildren<Input>(Input);

  email = signal<string | null>("");

  // Contador para reenvío
  countdown = signal<number>(0);
  canResend = computed(() => this.countdown() === 0);

  loading = computed(() => this.registerApi.loading());
  errorResponse = computed(() => this.registerApi.errorResponse());

  code = this.fb.array(
    this.array.map(() => this.fb.control('', [Validators.required, Validators.pattern('^[0-9]$')])),
  ) as FormArray<FormControl<string>>;

  constructor() {
    this.changeFocus();
    this.getEmail();
  }

  getEmail = () => {
    const emailParam = this.activateRoute.snapshot.paramMap.get('email');
    if (emailParam) {
      this.email.set(emailParam);
    }
  }

  changeFocus() {
    let previousValue: string[] = [];

    this.code.valueChanges.subscribe((value) => {
      const wasDeleting = previousValue.some((prev, index) => prev && !value[index]);
      if (wasDeleting) {
        const lastFilledIndex = value.map((val, index) => val ? index : -1)
          .filter(index => index !== -1)
          .pop() ?? 0;

        this.inputs().at(lastFilledIndex)?.onFocus();

      } else {
        const currentIndex = value.findIndex(val => val === '');
        this.inputs().at(currentIndex)?.onFocus();
      }

      previousValue = [...value];
    });
  }

  isCodeComplete(): boolean {
    return this.code.value.every(digit => digit.length === 1);
  }

  verifyCode() {
    if (this.isCodeComplete()) {
      const code = this.code.value.join('');
      this.registerApi.veriefyEmailCode(this.email()!, code);
    }
  }
  resendCode() {
    if (this.canResend()) {
      this.registerApi.resendVerificationCode(this.email()!);
      this.countdown.set(10);
      const timer = setInterval(() => {
        const current = this.countdown();
        if (current > 0) {
          this.countdown.set(current - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }
  }

}

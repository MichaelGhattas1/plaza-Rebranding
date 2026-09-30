import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InquiryService } from '../../core/inquiry.service';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

const TOPIC_IDS = ['stay', 'journey', 'training', 'career', 'house'];

@Component({
  selector: 'app-contact',
  imports: [PageIntro, ReactiveFormsModule],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.contact.kicker" [title]="t.contact.title" [lead]="t.contact.lead" />
    <div class="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-16 md:px-8 lg:grid-cols-12">
      <aside class="lg:col-span-4">
        <p class="text-sm font-bold text-teal">{{ t.contact.asideTitle }}</p>
        <p class="mt-3 text-lg text-moss">{{ t.contact.asideText }}</p>
      </aside>

      <div class="card p-6 md:p-8 lg:col-span-8">
        @if (state() === 'sent') {
          <div role="status">
            <h2 class="display text-5xl">{{ t.contact.sentTitle }}</h2>
            <p class="mt-4 text-moss">{{ t.contact.sent }}</p>
            <button type="button" class="btn btn-ghost mt-6" (click)="reset()">{{ t.contact.another }}</button>
          </div>
        } @else {
          <form [formGroup]="form" novalidate (ngSubmit)="submit()">
            <fieldset>
              <legend class="text-sm font-bold">{{ t.contact.intentLabel }}</legend>
              <div class="mt-3 flex flex-wrap gap-2">
                <label [class]="intentClass('inquiry')">
                  <input class="sr-only" type="radio" formControlName="intent" value="inquiry" />
                  {{ t.contact.inquiry }}
                </label>
                <label [class]="intentClass('suggestion')">
                  <input class="sr-only" type="radio" formControlName="intent" value="suggestion" />
                  {{ t.contact.suggestion }}
                </label>
              </div>
              <p class="mt-3 text-sm text-moss">
                {{ form.controls.intent.value === 'inquiry' ? t.contact.inquiryHint : t.contact.suggestionHint }}
              </p>
            </fieldset>

            <div class="mt-8 grid gap-6 md:grid-cols-2">
              <label class="block">
                <span class="text-sm">{{ t.contact.name }}</span>
                <input class="field" type="text" formControlName="name" autocomplete="name" />
                @if (show('name')) {
                  <p class="field-error">{{ t.contact.required }}</p>
                }
              </label>
              <label class="block">
                <span class="text-sm">{{ t.contact.email }}</span>
                <input class="field" type="email" formControlName="email" autocomplete="email" />
                @if (show('email')) {
                  <p class="field-error">
                    {{ form.controls.email.hasError('required') ? t.contact.required : t.contact.emailInvalid }}
                  </p>
                }
              </label>
              <label class="block">
                <span class="text-sm">{{ t.contact.phone }} <span class="text-moss">({{ t.contact.optional }})</span></span>
                <input class="field" type="tel" formControlName="phone" autocomplete="tel" />
              </label>
              <label class="block">
                <span class="text-sm">{{ t.contact.topic }}</span>
                <select class="field" formControlName="topic">
                  <option value=""></option>
                  @for (topic of t.contact.topics; track topic.id) {
                    <option [value]="topic.id">{{ topic.label }}</option>
                  }
                </select>
                @if (show('topic')) {
                  <p class="field-error">{{ t.contact.required }}</p>
                }
              </label>
            </div>

            <label class="mt-6 block">
              <span class="text-sm">{{ t.contact.message }}</span>
              <textarea class="field min-h-36 resize-y" formControlName="message"></textarea>
              @if (show('message')) {
                <p class="field-error">{{ t.contact.required }}</p>
              }
            </label>

            @if (state() === 'held') {
              <p class="mt-6 rounded-2xl bg-butter px-4 py-3" role="status">{{ t.contact.held }}</p>
            }

            <button type="submit" class="btn btn-coral mt-6">{{ t.contact.send }}</button>
          </form>
        }
      </div>
    </div>
  `,
})
export class Contact {
  readonly lang = inject(LanguageService);
  private readonly inquiry = inject(InquiryService);
  private readonly route = inject(ActivatedRoute);
  private readonly roleId = signal<string | null>(null);
  readonly state = signal<'editing' | 'held' | 'sent'>('editing');

  readonly form = inject(FormBuilder).nonNullable.group({
    intent: 'inquiry' as 'inquiry' | 'suggestion',
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: '',
    topic: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const topic = params.get('topic');
      if (topic && TOPIC_IDS.includes(topic)) {
        this.form.controls.topic.setValue(topic);
      }
      this.roleId.set(params.get('role'));
    });

    effect(() => {
      const role = this.roleId();
      if (!role) return;
      const found = this.lang.copy().careers.roles.find((item) => item.id === role);
      if (!found) return;
      this.form.controls.intent.setValue('inquiry');
      this.form.controls.topic.setValue('career');
      this.form.controls.message.setValue(`${this.lang.copy().contact.regarding} ${found.title}.`);
    });
  }

  intentClass(intent: 'inquiry' | 'suggestion'): string {
    const on = this.form.controls.intent.value === intent;
    return on
      ? 'cursor-pointer rounded-full bg-coral px-4 py-2 text-sm font-bold text-white'
      : 'cursor-pointer rounded-full bg-blush px-4 py-2 text-sm font-bold text-ink';
  }

  show(name: 'name' | 'email' | 'topic' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.state.set('editing');
      return;
    }
    const sent = this.inquiry.submit(this.form.getRawValue());
    this.state.set(sent ? 'sent' : 'held');
  }

  reset(): void {
    this.form.reset({ intent: 'inquiry', name: '', email: '', phone: '', topic: '', message: '' });
    this.state.set('editing');
  }
}

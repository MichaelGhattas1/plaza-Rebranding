import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Motif } from '../../shared/motif/motif';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Motif],
  template: `
    @let t = lang.copy();
    <section class="mx-auto w-full max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
      <p class="chip">{{ t.home.eyebrow }}</p>
      <h1 class="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.8rem)]">{{ t.home.title }}</h1>
      <p class="mt-4 max-w-xl text-lg text-moss">{{ t.home.lead }}</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a class="btn btn-coral" routerLink="/tours">{{ t.home.journeysCta }}</a>
        <a class="btn btn-ghost" routerLink="/about">{{ t.home.houseCta }}</a>
      </div>
    </section>

    <section class="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-12 md:grid-cols-3 md:px-8">
      @for (item of t.home.principles; track item.title; let i = $index) {
        <article
          class="rounded-2xl p-5"
          [class.bg-mint]="i === 0"
          [class.bg-butter]="i === 1"
          [class.bg-blush]="i === 2"
        >
          <p class="text-sm font-bold" [class.text-teal]="i === 0" [class.text-gold]="i === 1" [class.text-coral]="i === 2">
            0{{ i + 1 }}
          </p>
          <h2 class="display mt-2 text-3xl">{{ item.title }}</h2>
          <p class="mt-2 text-moss">{{ item.text }}</p>
        </article>
      }
    </section>

    <section class="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="chip bg-mint text-teal">{{ t.home.journeysKicker }}</p>
          <h2 class="display mt-3 text-4xl">{{ t.home.journeysTitle }}</h2>
        </div>
        <p class="max-w-sm text-moss">{{ t.home.journeysLead }}</p>
      </div>
      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        @for (item of t.tours.items; track item.id) {
          <a class="card block p-5" [routerLink]="['/tours']" [fragment]="item.id">
            <app-motif class="block max-w-[8.5rem]" [name]="item.motif" />
            <p class="mt-4 text-sm font-bold text-teal">{{ item.kicker }}</p>
            <h3 class="display mt-1 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
      <p class="chip bg-butter text-gold">{{ t.home.servicesKicker }}</p>
      <h2 class="display mt-3 text-4xl">{{ t.home.servicesTitle }}</h2>
      <p class="mt-2 max-w-xl text-moss">{{ t.home.servicesLead }}</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        @for (item of t.services.items; track item.id; let i = $index) {
          <a class="card block p-5" [routerLink]="['/services']" [fragment]="item.id">
            <span
              class="inline-flex size-9 items-center justify-center rounded-full text-sm font-bold"
              [class.bg-coral]="i === 0"
              [class.bg-butter]="i === 1"
              [class.bg-teal]="i === 2"
              [class.bg-sky]="i === 3"
              [class.text-white]="i !== 1"
              [class.text-ink]="i === 1"
            >
              {{ item.index }}
            </span>
            <h3 class="display mt-3 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 md:px-8 lg:grid-cols-2">
      <div class="card bg-ice p-6">
        <p class="chip bg-white text-sky">{{ t.home.trainingKicker }}</p>
        <h2 class="display mt-3 text-4xl">{{ t.home.trainingTitle }}</h2>
        <p class="mt-3 text-moss">{{ t.home.trainingLead }}</p>
        <a class="btn btn-sky mt-5" routerLink="/training">{{ t.home.trainingCta }}</a>
      </div>
      <div class="grid gap-4">
        @for (item of t.events.programs; track item.id) {
          <a class="card block p-5" [routerLink]="['/training']" [fragment]="item.id">
            <p class="text-sm font-bold text-sky">{{ item.audience }}</p>
            <h3 class="display mt-1 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section class="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 pb-16 md:px-8 md:grid-cols-2">
      <div class="rounded-3xl bg-teal p-6 text-white md:p-8">
        <p class="text-sm font-bold text-mint">{{ t.home.careersKicker }}</p>
        <h2 class="display mt-2 text-4xl">{{ t.home.careersTitle }}</h2>
        <p class="mt-3 max-w-md text-mint">{{ t.home.careersLead }}</p>
        <a class="btn mt-5 bg-white text-teal" routerLink="/roles">{{ t.home.careersCta }}</a>
      </div>
      <div class="rounded-3xl bg-coral p-6 text-white md:p-8">
        <p class="text-sm font-bold text-blush">{{ t.home.contactKicker }}</p>
        <h2 class="display mt-2 text-4xl">{{ t.home.contactTitle }}</h2>
        <p class="mt-3 max-w-md text-blush">{{ t.home.contactLead }}</p>
        <a class="btn mt-5 bg-white text-coral" routerLink="/contact">{{ t.home.contactCta }}</a>
      </div>
    </section>
  `,
})
export class Home {
  readonly lang = inject(LanguageService);
}

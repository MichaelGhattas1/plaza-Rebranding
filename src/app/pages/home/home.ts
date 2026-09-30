import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { Motif } from '../../shared/motif/motif';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Motif, Reveal],
  template: `
    @let t = lang.copy();
    <section class="relative overflow-hidden">
      <div class="float pointer-events-none absolute -top-24 end-0 size-80 rounded-full bg-blush/80" aria-hidden="true"></div>
      <div class="float float-late pointer-events-none absolute top-36 start-8 size-40 rounded-full bg-mint/90" aria-hidden="true"></div>
      <div appReveal class="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-14 pb-8 md:px-8 lg:grid-cols-12 lg:pt-20">
        <div class="lg:col-span-7">
          <p class="chip">{{ t.home.eyebrow }}</p>
          <h1 class="display mt-5 max-w-xl text-[clamp(2.7rem,6vw,4.5rem)]">{{ t.home.title }}</h1>
          <p class="mt-5 max-w-lg text-lg text-moss">{{ t.home.lead }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a class="btn btn-coral" routerLink="/tours">{{ t.home.journeysCta }}</a>
            <a class="btn btn-ghost" routerLink="/about">{{ t.home.houseCta }}</a>
          </div>
        </div>
        <div class="relative lg:col-span-5">
          <div class="float absolute -start-5 top-10 hidden size-24 rounded-[1.7rem] bg-coral lg:block" aria-hidden="true"></div>
          <div class="float float-late absolute -end-3 -bottom-5 hidden size-16 rounded-full bg-sun lg:block" aria-hidden="true"></div>
          <div class="card relative p-7">
            <p class="chip bg-mint text-teal">{{ t.home.statementKicker }}</p>
            <p class="display mt-4 text-3xl">{{ t.home.statement }}</p>
            <ul class="mt-6 space-y-3">
              @for (item of t.home.principles; track item.title; let i = $index) {
                <li class="flex items-center gap-3">
                  <span
                    class="size-2.5 shrink-0 rounded-full"
                    [class.bg-teal]="i === 0"
                    [class.bg-sun]="i === 1"
                    [class.bg-coral]="i === 2"
                  ></span>
                  <span class="font-semibold">{{ item.title }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section appReveal class="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-8 md:grid-cols-3 md:px-8">
      @for (item of t.home.principles; track item.title; let i = $index) {
        <article class="panel relative overflow-hidden p-6">
          <p
            class="display pointer-events-none absolute -end-1 -top-3 text-7xl opacity-15"
            [class.text-teal]="i === 0"
            [class.text-gold]="i === 1"
            [class.text-coral]="i === 2"
            aria-hidden="true"
          >
            0{{ i + 1 }}
          </p>
          <p class="text-sm font-bold" [class.text-teal]="i === 0" [class.text-gold]="i === 1" [class.text-coral]="i === 2">
            0{{ i + 1 }}
          </p>
          <h2 class="display mt-3 text-3xl">{{ item.title }}</h2>
          <p class="mt-3 text-moss">{{ item.text }}</p>
        </article>
      }
    </section>

    <section appReveal class="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="chip bg-mint text-teal">{{ t.home.journeysKicker }}</p>
          <h2 class="display mt-3 text-4xl">{{ t.home.journeysTitle }}</h2>
        </div>
        <p class="max-w-sm text-moss">{{ t.home.journeysLead }}</p>
      </div>
      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        @for (item of t.tours.items; track item.id; let i = $index) {
          <a class="panel block overflow-hidden" [routerLink]="['/tours']" [fragment]="item.id">
            <div class="h-2" [class.bg-teal]="i === 0" [class.bg-sun]="i === 1" [class.bg-coral]="i === 2"></div>
            <div class="p-5">
              <div
                class="flex h-28 items-center justify-center rounded-2xl px-4"
                [class.bg-mint]="i === 0"
                [class.bg-butter]="i === 1"
                [class.bg-blush]="i === 2"
              >
                <app-motif class="float block w-full max-w-32" [name]="item.motif" />
              </div>
              <p class="mt-4 text-sm font-bold text-teal">{{ item.kicker }}</p>
              <h3 class="display mt-1 text-3xl">{{ item.title }}</h3>
              <p class="mt-2 text-moss">{{ item.text }}</p>
            </div>
          </a>
        }
      </div>
    </section>

    <section appReveal class="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
      <p class="chip bg-butter text-gold">{{ t.home.servicesKicker }}</p>
      <h2 class="display mt-3 text-4xl">{{ t.home.servicesTitle }}</h2>
      <p class="mt-2 max-w-xl text-moss">{{ t.home.servicesLead }}</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        @for (item of t.services.items; track item.id; let i = $index) {
          <a class="panel grid overflow-hidden sm:grid-cols-[4.5rem_1fr]" [routerLink]="['/services']" [fragment]="item.id">
            <span
              class="flex items-center justify-center py-4 text-sm font-bold"
              [class.bg-coral]="i === 0"
              [class.bg-butter]="i === 1"
              [class.bg-teal]="i === 2"
              [class.bg-sky]="i === 3"
              [class.text-white]="i !== 1"
              [class.text-ink]="i === 1"
            >
              {{ item.index }}
            </span>
            <span class="block p-5">
              <h3 class="display text-3xl">{{ item.title }}</h3>
              <p class="mt-2 text-moss">{{ item.text }}</p>
            </span>
          </a>
        }
      </div>
    </section>

    <section appReveal class="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 md:px-8 lg:grid-cols-5">
      <div class="card relative overflow-hidden bg-ice p-7 lg:col-span-2">
        <div class="float pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-sky/20" aria-hidden="true"></div>
        <p class="chip relative bg-white text-sky">{{ t.home.trainingKicker }}</p>
        <h2 class="display relative mt-4 text-4xl">{{ t.home.trainingTitle }}</h2>
        <p class="relative mt-3 text-moss">{{ t.home.trainingLead }}</p>
        <a class="btn btn-sky relative mt-6" routerLink="/training">{{ t.home.trainingCta }}</a>
      </div>
      <div class="grid gap-4 lg:col-span-3">
        @for (item of t.events.programs; track item.id; let i = $index) {
          <a class="panel block p-6" [routerLink]="['/training']" [fragment]="item.id">
            <p class="text-sm font-bold" [class.text-sky]="i === 0" [class.text-teal]="i === 1">{{ item.audience }}</p>
            <h3 class="display mt-2 text-3xl">{{ item.title }}</h3>
            <p class="mt-2 text-moss">{{ item.text }}</p>
          </a>
        }
      </div>
    </section>

    <section appReveal class="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 pb-16 md:px-8 md:grid-cols-2">
      <div class="relative overflow-hidden rounded-[2rem] bg-teal p-8 text-white">
        <div class="float pointer-events-none absolute -end-8 -bottom-10 size-36 rounded-full bg-white/15" aria-hidden="true"></div>
        <p class="text-sm font-bold text-mint">{{ t.home.careersKicker }}</p>
        <h2 class="display mt-2 text-4xl">{{ t.home.careersTitle }}</h2>
        <p class="mt-3 max-w-md text-mint">{{ t.home.careersLead }}</p>
        <a class="btn relative mt-6 bg-white text-teal" routerLink="/roles">{{ t.home.careersCta }}</a>
      </div>
      <div class="relative overflow-hidden rounded-[2rem] bg-coral p-8 text-white">
        <div class="float float-late pointer-events-none absolute -start-8 -top-10 size-36 rounded-full bg-white/15" aria-hidden="true"></div>
        <p class="text-sm font-bold text-blush">{{ t.home.contactKicker }}</p>
        <h2 class="display mt-2 text-4xl">{{ t.home.contactTitle }}</h2>
        <p class="mt-3 max-w-md text-blush">{{ t.home.contactLead }}</p>
        <a class="btn relative mt-6 bg-white text-coral" routerLink="/contact">{{ t.home.contactCta }}</a>
      </div>
    </section>
  `,
})
export class Home {
  readonly lang = inject(LanguageService);
}

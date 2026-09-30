import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { PageIntro } from '../../shared/page-intro/page-intro';

@Component({
  selector: 'app-careers',
  imports: [PageIntro, RouterLink],
  template: `
    @let t = lang.copy();
    <app-page-intro [kicker]="t.careers.kicker" [title]="t.careers.title" [lead]="t.careers.lead" />
    <div class="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
      <div class="flex flex-wrap gap-2" role="group" [attr.aria-label]="t.careers.all">
        <button type="button" class="rounded-full px-4 py-2 text-sm font-bold" [class]="filter() === 'all' ? 'bg-teal text-white' : 'bg-white text-moss'" (click)="filter.set('all')">
          {{ t.careers.all }}
        </button>
        @for (item of departments(); track item.id) {
          <button
            type="button"
            class="rounded-full px-4 py-2 text-sm font-bold"
            [class]="filter() === item.id ? 'bg-teal text-white' : 'bg-white text-moss'"
            (click)="filter.set(item.id)"
          >
            {{ item.label }}
          </button>
        }
      </div>
      <ul class="mt-5 grid gap-3">
        @for (role of roles(); track role.id) {
          <li class="card grid items-start gap-4 p-5 md:grid-cols-12">
            <div class="md:col-span-5">
              <h2 class="display text-3xl">{{ role.title }}</h2>
              <p class="mt-1 text-sm text-moss">{{ role.department }} · {{ role.place }} · {{ role.type }}</p>
            </div>
            <p class="text-moss md:col-span-5">{{ role.summary }}</p>
            <div class="md:col-span-2 md:text-end">
              <a class="btn btn-coral" routerLink="/contact" [queryParams]="{ topic: 'career', role: role.id }">
                {{ t.careers.apply }}
              </a>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
})
export class Careers {
  readonly lang = inject(LanguageService);
  readonly filter = signal<string>('all');

  readonly departments = computed(() => {
    const seen = new Set<string>();
    return this.lang.copy().careers.roles.flatMap((role) => {
      if (seen.has(role.departmentId)) return [];
      seen.add(role.departmentId);
      return [{ id: role.departmentId, label: role.department }];
    });
  });

  readonly roles = computed(() => {
    const roles = this.lang.copy().careers.roles;
    const filter = this.filter();
    return filter === 'all' ? roles : roles.filter((role) => role.departmentId === filter);
  });
}

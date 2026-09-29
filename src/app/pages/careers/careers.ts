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
    <div class="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10">
      <div class="flex flex-wrap gap-3" role="group" [attr.aria-label]="t.careers.all">
        <button type="button" class="nav-link" [class.is-active]="filter() === 'all'" (click)="filter.set('all')">
          {{ t.careers.all }}
        </button>
        @for (item of departments(); track item.id) {
          <button
            type="button"
            class="nav-link"
            [class.is-active]="filter() === item.id"
            (click)="filter.set(item.id)"
          >
            {{ item.label }}
          </button>
        }
      </div>
      <ul class="mt-8">
        @for (role of roles(); track role.id) {
          <li class="grid items-start gap-4 border-t border-line py-8 lg:grid-cols-12">
            <div class="lg:col-span-5">
              <h2 class="display text-4xl">{{ role.title }}</h2>
              <p class="mt-2 text-sm text-moss">{{ role.department }} · {{ role.place }} · {{ role.type }}</p>
            </div>
            <p class="text-moss lg:col-span-5">{{ role.summary }}</p>
            <div class="lg:col-span-2 lg:text-end">
              <a
                class="mark-link"
                routerLink="/contact"
                [queryParams]="{ topic: 'career', role: role.id }"
              >
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

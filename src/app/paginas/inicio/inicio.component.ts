import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit{
  constructor() { }

  ngAfterViewInit() {
    const next = document.querySelector('.next') as HTMLElement;
    const prev = document.querySelector('.prev') as HTMLElement;

    if (next) {
      next.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.appendChild(items[0]);
        }
      });
    }
    if (prev) {
      prev.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.insertBefore(items[items.length - 1], items[0]);
        }
      });
    }
  }
}

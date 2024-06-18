import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit, OnDestroy{
  intervalo: any;
  constructor() { }

  ngAfterViewInit() {
    this.intervalo = setInterval(reiniciarIntervalo, 10000);

    const next = document.querySelector('.next') as HTMLElement;
    const prev = document.querySelector('.prev') as HTMLElement;

    function reiniciarIntervalo() {
      const items = document.querySelectorAll('.item');
      const slide = document.querySelector('.slide');
      if (slide && items.length > 0) {
        slide.appendChild(items[0]);
      }
    }

    if (next) {
      next.addEventListener('click', () => {
        clearInterval(this.intervalo);
        this.intervalo = setInterval(reiniciarIntervalo, 10000);
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.appendChild(items[0]);
        }
      });
    }
    if (prev) {
      prev.addEventListener('click', () => {
        clearInterval(this.intervalo);
        this.intervalo = setInterval(reiniciarIntervalo, 10000);
        const items = document.querySelectorAll('.item');
        const slide = document.querySelector('.slide');
        if (slide && items.length > 0) {
          slide.insertBefore(items[items.length - 1], items[0]);
        }
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}

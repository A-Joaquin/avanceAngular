import { Component,OnInit,OnDestroy, input, Input } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.scss'
})
export class ContactanosComponent implements OnInit,OnDestroy {

  //constructor para inicializar valores
  @Input() idPersona="";
  saludo!:string;
  //3hooks
  constructor()
  {
    this.saludo="Hola";
    console.log("Soy el constructor");
  }
  //primero se ejcuta el const, luego OnInit...Ondestroy
  ngOnInit():void{
    //los decoradores ya estan ejecutadas al entrar aqui.

    console.log("propiedades establecidas");
  }
  //justo antes de destruirse
  ngOnDestroy():void{
    console.log("El componente se destruye");
    window.alert("no te vayas");
  }
}

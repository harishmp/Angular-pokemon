import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonDetailbyName, PokemonDetailLocalStorage } from 'src/app/typed';

@Component({
  selector: 'app-pokemoncard',
  templateUrl: './pokemoncard.component.html',
  styleUrls: ['./pokemoncard.component.scss']
})
export class PokemoncardComponent implements OnInit {
  @Input() dataList: PokemonDetailbyName;
  @Input() iconColorfirst: string;
  @Input() materialIconfirst: string;
  @Input() iconColorsecond: string;
  @Input() materialIconsecond: string;
  @Output() onclickEventfirsticon = new EventEmitter();
  @Output() onclickEventsecondicon = new EventEmitter();
  @Output() onclickEventredirect = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onclickFirsticon(data: PokemonDetailLocalStorage) {
    this.onclickEventfirsticon.emit(data);
  }

  onclickSecondicon(data: PokemonDetailLocalStorage) {
    this.onclickEventsecondicon.emit(data);
  }

  redirecttoDetailPage(data: PokemonDetailLocalStorage) {
    this.onclickEventredirect.emit(data);
  }

}

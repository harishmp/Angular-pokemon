import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokemoncard',
  templateUrl: './pokemoncard.component.html',
  styleUrls: ['./pokemoncard.component.scss']
})
export class PokemoncardComponent implements OnInit {
  @Input() dataList;
  @Input() iconColorfirst;
  @Input() materialIconfirst;
  @Input() iconColorsecond;
  @Input() materialIconsecond;
  @Output() onclickEventfirsticon = new EventEmitter();
  @Output() onclickEventsecondicon = new EventEmitter();
  @Output() onclickEventredirect = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onclickFirsticon(data) {
    this.onclickEventfirsticon.emit(data);
  }

  onclickSecondicon(data) {
    this.onclickEventsecondicon.emit(data);
  }

  redirecttoDetailPage(data) {
    this.onclickEventredirect.emit(data);
  }

}

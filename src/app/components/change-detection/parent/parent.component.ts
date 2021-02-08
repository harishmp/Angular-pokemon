import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/typed';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public person: Person = {
    name: 'Harish Mahadi'
  };

  public reassign(): void {
    this.person = {
      name: this.person.name
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}

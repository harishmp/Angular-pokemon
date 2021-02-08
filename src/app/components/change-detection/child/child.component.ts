import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Person } from 'src/app/typed';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
  @Input() person: Person;

  constructor() { }

  ngOnInit(): void {
  }

}

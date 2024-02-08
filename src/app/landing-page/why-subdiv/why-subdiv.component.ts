import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'why-subdiv',
  templateUrl: './why-subdiv.component.html',
  styleUrls: ['./why-subdiv.component.scss']
})
export class WhySubdivComponent implements OnInit {

  @Input() title!: string;
  @Input() description!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss']
})
export class WordTableComponent implements OnInit {
  @Input()
  wordArr = [];
  constructor() {
    
  }
 
  ngOnInit() {
  }

}

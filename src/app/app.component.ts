import { Component } from '@angular/core';
import { FileService } from './_service/file.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  minVal = 1
  maxVal = null;
  nVal = 1;
  wordArr
  showingVal = 0;
  constructor(private fileService: FileService) {
    this.fileService.getMaxWordCount().subscribe(data => {
      this.maxVal = data.maxVal;
    })
  }
  ngOnInit() {
  }
  onSubmit() {
    this.fileService.sendN(this.nVal).subscribe(data => {
      this.wordArr = data;
      if (data.errMsg) {
        this.setErrors(data.errMsg);
        return;
      }
      this.wordArr = data;
      this.showingVal = this.wordArr.length;
      $('tbody').animate({
        scrollTop: 0
      }, 500);
    },
      error => {
        this.setErrors(error);
      });
  }

  setErrors(errMsg) {

  }


  onInputChange(event: any) {
    this.nVal = event.value;
  }
}

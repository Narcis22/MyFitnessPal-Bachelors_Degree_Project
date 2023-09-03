import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FullMedalsListComponent } from '../full-medals-list/full-medals-list.component';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-share-template',
  templateUrl: './share-template.component.html',
  styleUrls: ['./share-template.component.css']
})
export class ShareTemplateComponent {

  monthNames: Map<string, string> = new Map();
  sportNameCustom: string = "";
  username: string | null = localStorage.getItem('username');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate:  TranslateService,
    private dialogRef: MatDialogRef<FullMedalsListComponent>,
    ){
      if(data.medal.level === 1){
        this.sportNameCustom = "bronze-sport-name";
      } else if(data.medal.level === 2){
        this.sportNameCustom = "silver-sport-name";
      } else if(data.medal.level === 3){
        this.sportNameCustom = "gold-sport-name";
      } else if(data.medal.level === 4){
        this.sportNameCustom = "month-sport-name";
      }
      this.populateMonths();
    }

    close(){
      this.dialogRef.close()
    }

    populateMonths(){
      this.monthNames.set("01",this.translate.instant('months.jan'));
      this.monthNames.set("02",this.translate.instant('months.feb'));
      this.monthNames.set("03",this.translate.instant('months.mar'));
      this.monthNames.set("04",this.translate.instant('months.apr'));
      this.monthNames.set("05",this.translate.instant('months.may'));
      this.monthNames.set("06",this.translate.instant('months.jun'));
      this.monthNames.set("07",this.translate.instant('months.jul'));
      this.monthNames.set("08",this.translate.instant('months.aug'));
      this.monthNames.set("09",this.translate.instant('months.sep'));
      this.monthNames.set("10",this.translate.instant('months.oct'));
      this.monthNames.set("11",this.translate.instant('months.nov'));
      this.monthNames.set("12",this.translate.instant('months.dec'));
    }

    capture() {
      const captureElement = document.querySelector('.specific') as HTMLElement;
      html2canvas(captureElement)
        .then(canvas => {
          canvas.style.display = 'none'
          document.body.appendChild(canvas)
          return canvas
        })
        .then(canvas => {
          const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
          const a = document.createElement('a')
          a.setAttribute('download', 'social-media-ready-award.png')
          a.setAttribute('href', image)
          a.click()
          canvas.remove()
        })
    }
}

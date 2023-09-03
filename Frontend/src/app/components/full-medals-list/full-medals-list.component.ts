import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AchievementModel } from 'src/app/models/achievement-model';
import { ShareTemplateComponent } from '../share-template/share-template.component';

@Component({
  selector: 'app-full-medals-list',
  templateUrl: './full-medals-list.component.html',
  styleUrls: ['./full-medals-list.component.css']
})
export class FullMedalsListComponent {
  titleText: string = "";
  shadowClass: string = "";
  medalType: string = "";
  countMedals: Map<string, number> = new Map();

  displayedColumns: string[] = ['icon', 
                                'sportName',
                                'count', 
                                'share'];
  
  dataSource: MatTableDataSource<AchievementModel> | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate:  TranslateService,
    private dialogRef: MatDialogRef<FullMedalsListComponent>,
    private dialog: MatDialog,){
      if(data.medals[0].level === 1){
        this.shadowClass = "bronze-drop-shadow";
        this.medalType = "bronze";
        this.titleText = this.translate.instant('achievements.bronze-list-title');
      } else if(data.medals[0].level === 2){
        this.shadowClass = "black-drop-shadow";
        this.medalType = "silver";
        this.titleText = this.translate.instant('achievements.silver-list-title')
      } else if(data.medals[0].level === 3){
        this.shadowClass = "gold-drop-shadow";
        this.medalType = "gold";
        this.titleText = this.translate.instant('achievements.gold-list-title')
      }

      this.loadTable();

      if(this.data.hasNotification === true){
        this.openShareDialog(this.data.newAchievement);
      }

  }

  async loadTable() {
    const unique = this.data.medals.filter((elem: AchievementModel, index: number) => 
                                            this.data.medals.findIndex((obj: AchievementModel) => obj.sportName === elem.sportName) === index);

    for (let i in unique){
      let count = this.data.medals.filter((elem: AchievementModel) => elem.sportName === unique[i].sportName).length;

      this.countMedals.set(unique[i].sportName, count);
    }

    this.dataSource = new MatTableDataSource<AchievementModel>(unique);
  }

  openShareDialog(selectedMedal: AchievementModel){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ShareTemplateComponent, {
      autoFocus: true,
      width: "1000px",
      height: "760px",
      data: {
        medal: selectedMedal,
        medalType: this.medalType,
        count: this.countMedals.get(selectedMedal.sportName)
      }
    });
  }

  close(){
    this.dialogRef.close();
  }

}

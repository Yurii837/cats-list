import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImgParametr } from 'src/app/Types/cats-list.interface';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent {

  constructor (
    @Inject(MAT_DIALOG_DATA)
    public data: ImgParametr,
    public dialogRef: MatDialogRef<ImgViewComponent>,
  ) {}
 
}

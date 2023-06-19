import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CatItem } from 'src/app/Types/cats-list.interface';
import { CatsServise } from 'src/app/cats.service';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent {

  public catDescription = 'For unexpective reason there is no description sends. Look at this cat and smile =)';

  constructor (
    @Inject(MAT_DIALOG_DATA)
    public data: CatItem,
    public dialogRef: MatDialogRef<ImgViewComponent>,
    private catsService: CatsServise,
  ) {
    this.catsService.getCat(this.data.id)
    .pipe(first())
    .subscribe(cat => {
      if (cat?.description) {
        this.catDescription = cat?.description
      }
    })
  }
 
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsServise } from './cats.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatItem } from './Types/cats-list';
import { MatDialog } from '@angular/material/dialog';
import { ImgViewComponent } from './Components/img-view/img-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
 
  constructor (
    public catsServise: CatsServise,
    public dialog: MatDialog,
    ) { }

  public formGroup = new FormGroup ({
    SearchQuery: new FormControl<string | null>(null,  [Validators.maxLength(10)]),
    Breed: new FormControl(null),
    PerPage: new FormControl(null),
  })

  public items: CatItem[] = [
    {"id":"J2PmlIizw","url":"https://cdn2.thecatapi.com/images/J2PmlIizw.jpg","width":1080,"height":1350},
    {"id":"LSaDk6OjY","url":"https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg","width":1080,"height":1080},
    {"id":"8pCFG7gCV","url":"https://cdn2.thecatapi.com/images/8pCFG7gCV.jpg","width":750,"height":937},
    {"id":"8ciqdpaO5","url":"https://cdn2.thecatapi.com/images/8ciqdpaO5.jpg","width":1080,"height":809},
    {"id":"VZ3qFLIe3","url":"https://cdn2.thecatapi.com/images/VZ3qFLIe3.jpg","width":750,"height":937},
    {"id":"GAmy2bg8G","url":"https://cdn2.thecatapi.com/images/GAmy2bg8G.jpg","width":750,"height":750},
    {"id":"8RsP7Xt3h","url":"https://cdn2.thecatapi.com/images/8RsP7Xt3h.jpg","width":1024,"height":817},
    {"id":"bz15V3Kvg","url":"https://cdn2.thecatapi.com/images/bz15V3Kvg.jpg","width":1440,"height":1080},
    {"id":"NwMUoJYmT","url":"https://cdn2.thecatapi.com/images/NwMUoJYmT.jpg","width":2160,"height":1440},
    {"id":"ZocD-pQxd","url":"https://cdn2.thecatapi.com/images/ZocD-pQxd.jpg","width":880,"height":1100}
  ]
  
  ngOnInit(): void {
    this.formGroup.valueChanges
      .subscribe(res => {
        console.log(res)
      })
  }

  public openImg(item: CatItem) {
    this.dialog.open(ImgViewComponent, {
      maxHeight: "95vh",
      minWidth: "95vw",
      data: item,
    });
  }

  ngOnDestroy(): void {
    
  }
}

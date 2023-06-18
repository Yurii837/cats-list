import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsServise } from './cats.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CatItem, Form } from './Types/cats-list.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImgViewComponent } from './Components/img-view/img-view.component';
import { debounceTime } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { CatsState } from './NgXS/app-state.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(CatsState)cats$: Observable<any> | undefined;
 
  constructor (
    public catsServise: CatsServise,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  public SearchQuery = new FormControl(null,  [Validators.maxLength(10)]);

  public formGroup = new FormGroup ({
    Breed: new FormControl<string | null>(null),
    Limit: new FormControl<number | null>(10)
  })

  private searchSub = new Subscription();
  private formSub = new Subscription();

  public initItems: CatItem[] = [
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
  public items: CatItem[] = this.initItems;
  
  ngOnInit(): void {
    this.formGroup.get('Limit')?.patchValue(this.activatedRoute.snapshot.queryParams['limit'])
    this.formGroup.get('Breed')?.patchValue(this.activatedRoute.snapshot.queryParams['breed_ids'])

 
    this.searchSub = this.SearchQuery.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(res => {
        this.search(res)
      })

      this.formSub = this.formGroup.valueChanges
    .subscribe(res => {
      this.changeQueryParams(res)
    })

    this.catsServise.getBreeds();
    
    this.cats$?.subscribe(res => {
      console.log('cats', res)
    })
    
  }

  private search(value: string | null) { 
    let filter = value?.toLowerCase() || '';
    
    this.items = this.initItems.filter(option => {
      return option.id.toLowerCase().includes(filter)
    });
  };


  public openImg(item: CatItem) {
    this.dialog.open(ImgViewComponent, {
      maxHeight: "95vh",
      minWidth: "95vw",
      data: item,
    });
  }


  private changeQueryParams(params: any) {
    const queryParams: Params = {'limit': params.Limit, 'breed_ids': params.Breed}
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge',
      });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
    this.formSub.unsubscribe()
  }
}

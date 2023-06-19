import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CatsServise } from './cats.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Breed, CatItem, StateModel } from './Types/cats-list.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImgViewComponent } from './Components/img-view/img-view.component';
import { debounceTime, skip, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { CatsState } from './NgXS/app-state.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(CatsState)data$: Observable<StateModel> | undefined;
 
  constructor (
    public catsServise: CatsServise,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
      this.catsServise.getBreeds();
     }

  public SearchQuery = new FormControl(null,  [Validators.maxLength(10)]);
  public formGroup = new FormGroup ({
    Breed: new FormControl<string | null[]>([]),
    Limit: new FormControl<string>('10')
  })

  private searchSub = new Subscription();
  private formSub = new Subscription();
  public initItems: CatItem[] = []
  public items: CatItem[] = this.initItems;
  public breeds: Breed[] = [];

  
  ngOnInit(): void {
    this.activatedRoute.snapshot
  
    // fill form according query
    this.activatedRoute.queryParams
    .pipe(
      skip(1), // Skip the first emit
      take(1) // Take only one emit
    )
    .subscribe(query => {
      this.formGroup.get('Limit')?.patchValue(query['limit'])
      this.formGroup.get('Breed')?.patchValue(query['breed_ids']?.split(','))
    })

    // allways add 'limit' query-parametr in the end of the stack
    setTimeout(() => {
        this.changeQueryParams({
        Limit: this.formGroup.value.Limit
      })
    }, 0)
    
    
    // Search handler
    this.searchSub = this.SearchQuery.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(res => {
        this.search(res)
      })

    // Form handler
    this.formSub = this.formGroup.valueChanges
    .subscribe(res => {
      this.changeQueryParams(res);
    })
    
    // fill data from NgXS
    this.data$?.subscribe(res => {
      this.initItems = res.cats;
      this.items = res.cats;
      this.breeds = res.breeds;
    })
  }

  // search functional
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

  // change query-params
  private changeQueryParams(params: any) {
    
    const returnNullInsteadStr = (arr: any[]) => {
      return arr?.length ? arr.join(',') : null;
    }

    const queryParams: Params = {'limit': params.Limit, 'breed_ids': returnNullInsteadStr(params?.Breed)}
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

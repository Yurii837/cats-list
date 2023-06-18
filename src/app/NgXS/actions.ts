import { Action } from '@ngxs/store';
import { CatItem } from '../Types/cats-list.interface';

export class Cats {
  static readonly type = '[Cats] get';
  constructor(public cats: any) {}
}

export class Breeds {
  static readonly type = '[Breeds] get';
  constructor(public breeds: any) {}
}
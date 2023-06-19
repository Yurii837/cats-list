export class Cats {
  static readonly type = '[CatsState] cats';
  constructor(public cats: any) {}
}

export class Breeds {
  static readonly type = '[CatsState] breeds';
  constructor(public breeds: any) {}
}
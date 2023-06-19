export interface CatItem {
    url: string,
    width: number,
    height: number,
    id: string
}

export interface Form {
    Breed: string | null | undefined,
    Limit: number | null
}

export interface Breed {
    name: string,
    id: string
}

export interface StateModel {
    cats: CatItem[],
    breeds: Breed[]
  }


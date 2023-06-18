export interface ImgParametr {
    url: string,
    width: number,
    height: number
}

export interface CatItem extends ImgParametr {
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



export interface HitOrder {
  [id:string]: {
    value: number | null,
    order: number | null
  }
}

export interface Hit {
  [id:string]: {
    value: number | null
  }
}

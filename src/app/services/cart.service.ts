import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
}

export class CartRow {
  constructor(
    public id: number = 1,
    public name: string = "",
    public quantity: number = 1,
    public price: number = 10

  ){}
}

export class Product {
  constructor(
    public id:string,
    public title: string,
    public author: string,
    public image: string,
    public price: number,
    public description: string = '',
    public category: string = '',
    public stock: number = 0,
    public quantity: number=0
  ) { }
}

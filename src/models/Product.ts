
export class Product {
  constructor(
    public title: string,
    public author: string,
    public image: string,
    public price: number,
    public description?: string,
    public stock: number = 0
  ) { }
}

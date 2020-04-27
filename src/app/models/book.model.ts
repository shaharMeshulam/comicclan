export class Book {
  constructor(
    public name: string,
    public writer: string,
    public artist: string,
    public publication: string,
    public owner: string,
    public rating: number,
    public image: string,
    public summary: string,
    public year: number,
  ) { }
}

export class BooksGroup {
  constructor(public name: string, public books: Book[]) {}
}

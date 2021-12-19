import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListMetaService {

  private defaultPageSizePrivate: number;
  private defaultPageIndexPrivate: number;
  private defaultPageSizeOptionsPrivate: number[];
  private defaultSortPrivate: string;

  constructor() {
    this.defaultPageSizePrivate = 10;
    this.defaultPageIndexPrivate = 0;
    this.defaultPageSizeOptionsPrivate = [5, 10, 20, 50, 100];
    this.defaultSortPrivate = `-createdAt`;
  }

  get defaultPageSize(): number {
    return this.defaultPageSizePrivate;
  }

  set defaultPageSize(value: number) {
    this.defaultPageSizePrivate = value;
  }

  get defaultPageIndex(): number {
    return this.defaultPageIndexPrivate;
  }

  set defaultPageIndex(value: number) {
    this.defaultPageIndexPrivate = value;
  }

  get defaultPageSizeOptions(): number[] {
    return this.defaultPageSizeOptionsPrivate;
  }

  set defaultPageSizeOptions(value: number[]) {
    this.defaultPageSizeOptionsPrivate = value;
  }

  get defaultSort(): string {
    return this.defaultSortPrivate;
  }

  set defaultSort(value: string) {
    this.defaultSortPrivate = value;
  }
}

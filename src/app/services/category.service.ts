import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  // Load all the categories
  public getAllCategories(): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/category/getAll`);
  }

  // get category by id 
  public getCategoryById(categoryId: number): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/category/${categoryId}`);
  }

  // add new category
  public addCategory(category: any): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/category`, category);
  }

  // update the category
  public updateCategory(category: any, categoryId: number): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/category/${categoryId}`, category);
  }

  // delete the category
  public deleteCategory(categoryId: number): Observable<Object> {
    return this.http.delete(`${this.BASE_URL}/category/${categoryId}`);
  }
}

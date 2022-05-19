import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryModel } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    readonly rootUrl = environment.apiUrl + 'categories';

    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        })
    };

    getList(): Observable<CategoryModel[]> {
        return this.httpClient.get<CategoryModel[]>(this.rootUrl);
    }

    save(categoryModel: CategoryModel): Observable<CategoryModel> {
        return this.httpClient.post<CategoryModel>(this.rootUrl, JSON.stringify(categoryModel), this.httpOptions);
    }

    getActiveList(): Observable<CategoryModel[]> {
        return this.httpClient.get<CategoryModel[]>(this.rootUrl + '/active');
    }
}
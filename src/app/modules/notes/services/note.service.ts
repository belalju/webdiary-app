import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NoteModel } from "../models/note.model";

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    readonly rootUrl = environment.apiUrl + 'notes';

    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        })
    };

    getList(): Observable<NoteModel[]> {
        return this.httpClient.get<NoteModel[]>(this.rootUrl);
    }

    save(noteModel: NoteModel): Observable<NoteModel> {
        return this.httpClient.post<NoteModel>(this.rootUrl, JSON.stringify(noteModel), this.httpOptions);
    }
}
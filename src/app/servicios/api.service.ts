import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPost(id: any): Observable<any>{
    return this.http.get(this.apiURL + '/posts' + id).pipe(retry(3));
  }

  getPosts(): Observable<any>{
    return this.http.get(this.apiURL + '/posts').pipe(retry(3));
  }

  //Crear
  createPost(post: any): Observable<any>{
    return this.http.post(this.apiURL + '/posts' + post, this.httpOptions).pipe(retry(3));
  }

  //Eliminar
  deletePost(id: any): Observable<any>{
    return this.http.delete(this.apiURL + '/posts' + id).pipe(retry(3));
  }
  //Modificar
  updatePost(id: any, post:any): Observable<any>{
    return this.http.put(this.apiURL + '/posts' + id + post, this.httpOptions).pipe(retry(3));
  }

}

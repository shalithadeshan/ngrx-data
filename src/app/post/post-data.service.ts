import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import {Post} from '../models/post';

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http
      .get(`https://angular-project-1540e-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        `https://angular-project-1540e-default-rtdb.firebaseio.com/posts.json`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://angular-project-1540e-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`https://angular-project-1540e-default-rtdb.firebaseio.com/posts/${id}.json`)
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}

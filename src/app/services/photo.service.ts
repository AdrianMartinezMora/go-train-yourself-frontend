import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  createProdPhoto(image:File) {
    const fd = new FormData();
    fd.append('image',image)
    return this.http.post(`http://localhost:4000/api/prod`,fd)
  }

  createCatPhoto(image:File) {
    const fd = new FormData();
    fd.append('image',image)
    return this.http.post(`http://localhost:4000/api/cat`,fd)
  }

  createUserPhoto(image:File) {
    const fd = new FormData();
    fd.append('image',image)
    return this.http.post(`http://localhost:4000/api/usr`,fd)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  temp: any;
  pusharray: any = [];
  url = 'https://75b0afe3-3fa7-477b-8352-bdcfcd522a16-bluemix.cloudant.com/'
  dbUserName = 'apikey-v2-2djdlrrbf736ap4aa6rlre2x1j1wf65v1ti1e8x2bihn';
  dbPassword = '3bc2893c0a2a1ec42d9b17840b18447b';
  basicAuth = 'Basic ' + btoa(this.dbUserName + ':' + this.dbPassword);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  constructor(private http: HttpClient) { }

  adminData(formData: any) {
    console.log("From api", formData);
    return this.http.post<any>('http://localhost:8000/postdata4/', formData)
  }
  signUpData(formData: any) {
    console.log("From api", formData);
    return this.http.post<any>('http://localhost:8000/postdata2/', formData)
  }

  add(db: String, doc: object): Observable<{}> {
    console.log(doc);
    const url = this.url + db;
    return this.http.post(url, doc, this.httpOptions)
  }

  login_get(id: any) {
    return this.http.get<any>('http://localhost:8000/getdata/' + id);
  }
  findApi(selectorObject: any, dataBase: string) {
    // const url = this.url+ dataBase + '/_find'
    const url = `${this.url + dataBase}/_find`
    const dataObject = {
      selector: selectorObject
    }
    return this.http.post(url, dataObject, this.httpOptions)
  }
  // ProductDetails(datas:any){
  //   const url=this.url+'testdb/_find';
  //   console.log(datas);
  //   return this.http.post(url,datas,this.httpOptions);
  // }
  // orderDetails(datas:any){
  //   const url=this.url+'testdb/_find';
  //   console.log(datas);
  //   return this.http.post(url,datas,this.httpOptions);

  // }


}





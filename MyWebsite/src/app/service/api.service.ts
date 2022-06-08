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
  dataBaseName ="testdb";
    emailValidation(query:any){
      const url = `${this.url+this.dataBaseName}/_find`;
      const selectorData = {
        selector:query
      }
      return this.http.post(url,selectorData,this.httpOptions)
      }

  

  addProduct(db: string, doc: object): Observable<{}> {
    console.log(doc);
    const url = this.url + db;
    return this.http.post(url, doc, this.httpOptions)
  }

  addInfo(db: string, doc: object): Observable<{}> {
    console.log("addInfo", doc);
    const url = this.url + db;
    return this.http.post(url, doc, this.httpOptions)
  }
  getDataById(database: string, id: any) {
    const url = this.url + database + '/' + id;
    console.log(id);
    return this.http.get(url, this.httpOptions);
  }

  login_get(id: any) {
    return this.http.post<any>('http://localhost:8000/getdata/' , id);
  }
  findApi(selectedObject: any, dataBase: string) {
    const url = `${this.url + dataBase}/_design/product/_view/productview?include_docs=true&keys=["${selectedObject}"]` 
    return this.http.get(url, this.httpOptions)
  }

  alldocsapi(selectedObject: any, dataBase: string) {
    const url = `${this.url + dataBase}/_all_docs?include_docs=true` 
    return this.http.post(url, selectedObject,this.httpOptions)
  }
  orderProduct(order_id: any, database: string) {
    const url = `${this.url + database}/_find`;
    const selectorObject = {
      "selector": {
        type: "orderInfo",
        order: order_id.orderid,
      }
    }
    return this.http.post(url, selectorObject, this.httpOptions);
  }

}





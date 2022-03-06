import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KetooService {


  constructor(private httpClient: HttpClient) { }

  wooClientKey = 'ck_7ba1ad2f71463f0613bfaf597834fb8829269e7c';
  wooClientSecret = 'cs_2786b58e9434629fef06f2672137b5533ff67a83';
  wooUrl = 'https://ketooconstruction.com/wp-json/wc/v3';

  basicAuth(key: any, secret: any) {
    let hash = btoa(key + ':' + secret);
    return 'Basic ' + hash;
  }
  auth = this.basicAuth(this.wooClientKey, this.wooClientSecret);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

      Authorization: this.auth,
    }),
  };


login(json:any)
{
  return this.httpClient.post("https://ketooconstruction.com/wp-json/jwt-auth/v1/token",json,{headers:{
    Authorization:"Basic Og=="
   }}
   );
}
public ordersData()
{
  return this.httpClient.get("https://ketooconstruction.com/wp-json/wc/v3/orders",this.httpOptions);
}

statusUpdate(json:any,id:any)
{
  return this.httpClient.put("https://ketooconstruction.com/wp-json/wc/v3/orders/"+id,json,this.httpOptions);
}


public msgData(id:any)
{
  return this.httpClient.get("https://ketooconstruction.com/wp-json/wc/v3/orders/"+id+"/notes",this.httpOptions);
}


msgUpdate(json:any,id:any)
{
  return this.httpClient.post("https://ketooconstruction.com/wp-json/wc/v3/orders/"+id+"/notes",json,this.httpOptions);
}

}

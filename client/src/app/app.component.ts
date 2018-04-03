import { Component } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TTL';
  loaded = false;
  rows:Object = [];
  n = 0;

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  ngOnInit() {        
  }  
  count(){
    if(!Number.isInteger(this.n))
      this.n = 0;
    if(this.n > 0){
      console.log("n = " + this.n);
      let params = new HttpParams();
      params = params.append('n', (this.n).toString());
      this.http.get('/api/count',{params : params})
            .subscribe(res => {
                console.log(res);
                this.rows = res;
                this.loaded = true;
            }, (err) => {
                console.error(err);
                this.loaded = false;        
            });
    }
    
  }
}

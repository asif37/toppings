import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  toppinglist: any = [];
  topToppinglist: any = [];
  max :number;
  constructor(private http: HttpClient,private spinner: NgxSpinnerService) 
  {
    this.getAdvantageData();
  }
  ngOnInit() 
  {
    /** spinner starts on init */
    this.spinner.show();
  }
   getAdvantageData()
   {
      let apiUrl = './assets/pizzas.json';
      return this.http.get(apiUrl)
      .subscribe( (response: Response) => {
        debugger
         this.toppinglist = response;
         for (let i = 0; i < this.toppinglist.length; i++) 
         {
          var outerObject=this.toppinglist[i];
          this.toppinglist[i].repeat=0;
          for (let j = 0; j < this.toppinglist.length; j++) 
          {
            var innerObject=this.toppinglist[j];
            for (let k = 0; k < outerObject.toppings.length; k++) {
              if(outerObject.toppings[k] == innerObject.toppings[k]) 
              {
                this.toppinglist[i].repeat = this.toppinglist[i].repeat + 1;
              }
              if(outerObject.repeat != innerObject.repeat)
              {
                this.topToppinglist.push(innerObject);
              }
            }
           }
          }
       this.spinner.hide();
      });  
  }  
}

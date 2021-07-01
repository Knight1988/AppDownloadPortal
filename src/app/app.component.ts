import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import json from '../data/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppDownloadPortal';

  constructor(private http: HttpClient) {
    console.log(json);
  }

  ngOnInit(): void {
  }
}

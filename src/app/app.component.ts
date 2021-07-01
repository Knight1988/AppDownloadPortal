import {Component, OnInit} from '@angular/core';
import versionDev from '../data/version.dev.json';
import {IVersion} from "../interfaces/IVersion";
import _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  versions: IVersion[];

  selectedVersion: IVersion;

  url = "ms-appinstaller:?source=https://system-micromarket-data.s3-ap-northeast-1.amazonaws.com/Child-store/app/version/{env}/Taburettoreji.{env}.{version}.appinstaller"
  urlStg: string = "";

  constructor() {
    this.versions = _.orderBy(versionDev, "version", "desc");
    // this.versions = versionDev;
    this.selectedVersion = this.versions[0];
    this.updateUrlStg();
  }

  ngOnInit(): void {
  }

  updateUrlStg() {
    this.urlStg = this.url.replace('{env}', 'stg').replace('{version}', this.selectedVersion.version);
    console.log(this.urlStg);
  }
}

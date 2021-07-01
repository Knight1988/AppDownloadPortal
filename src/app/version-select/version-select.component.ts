import {Component, Input, OnInit} from '@angular/core';
import {IVersion} from "../../interfaces/IVersion";
import _ from "lodash";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-version-select',
  templateUrl: './version-select.component.html',
  styleUrls: ['./version-select.component.css']
})
export class VersionSelectComponent implements OnInit {

  @Input() env = 'dev';
  versions: IVersion[] = [];

  selectedVersion: IVersion | undefined;

  url = "ms-appinstaller:?source=https://system-micromarket-data.s3-ap-northeast-1.amazonaws.com/Child-store/app/version/{env}/Taburettoreji.{env}.{version}.appinstaller"
  urlApp: SafeUrl = "";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  loadData(data: any) {
    this.versions = _.orderBy(data, "version", "desc");
    this.selectedVersion = this.versions[0];
    this.updateUrl();
  }

  ngOnInit(): void {
    this.loadData = this.loadData.bind(this);
    this.http.get(`data/version.${this.env}.json`).subscribe(this.loadData)
  }

  updateUrl() {
    if (this.selectedVersion) {
      const url = this.url.replace(/{env}/g, this.env).replace('{version}', this.selectedVersion.version);
      this.urlApp = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}

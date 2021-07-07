import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AppVersion} from "../../models/version";
import {VersionService} from "../../services/version.service";

@Component({
  selector: 'app-version-select',
  templateUrl: './version-select.component.html',
  styleUrls: ['./version-select.component.css']
})
export class VersionSelectComponent implements OnInit {

  @Input() env = 'dev';
  versions: AppVersion[] = [];

  selectedVersion: AppVersion | undefined;

  url = "ms-appinstaller:?source=https://system-micromarket-data.s3-ap-northeast-1.amazonaws.com/Child-store/app/version/{env}/Taburettoreji.{env}.{version}.appinstaller"
  urlApp: SafeUrl = "";

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private versionService: VersionService) {
  }

  async loadData() {
    this.versions =
      await this.versionService.GetVersions(this.env);
    this.selectedVersion = this.versions[0];
    this.updateUrl();
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  updateUrl() {
    if (this.selectedVersion) {
      const url = this.url.replace(/{env}/g, this.env).replace('{version}', this.selectedVersion.version.toString());
      this.urlApp = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}

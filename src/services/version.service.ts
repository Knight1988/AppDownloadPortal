import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AppVersion} from "../models/version";

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(public http: HttpClient) { }

  public async GetVersions(env: string) {
    return await this.http.get<AppVersion[]>(`${environment.endPoint}/version/${env}`).toPromise();
  }

  async updateVersionAsync(selectedVersion: AppVersion | undefined) {
    return await this.http.put(`${environment.endPoint}/version/`, selectedVersion).toPromise();
  }

  async setDefault(selectedVersion: AppVersion) {
    return await this.http.put(`${environment.endPoint}/version/default`, selectedVersion).toPromise();
  }
}

import {Transform} from "class-transformer";

export class Version {
  major: number
  minor: number
  patch: number
  build: number

  constructor(major: number, minor: number, patch: number, build: number) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.build = build;
  }

  get compareString() {
    return `${this.major.toString().padStart(4, "0")}.${this.minor.toString().padStart(4, "0")}.${this.patch.toString().padStart(4, "0")}.${this.build.toString().padStart(4, "0")}`
  }

  toString = () : string => {
    return `${this.major}.${this.minor}.${this.patch}.${this.build}`
  }

  static parse(version: string): Version | null {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
    if (match) {
      return new Version(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4]))
    }

    return null;
  }
}

export class AppVersion {
  @Transform(({value}) => Version.parse(value))
  version: Version
}

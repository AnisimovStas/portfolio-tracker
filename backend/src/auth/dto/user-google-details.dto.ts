export class UserGoogleDetailsDto {
  id: string;
  displayName: string;
  name: GoogleName;
  emails: GoogleEmail[];
  photos: GooglePhoto[];
  provider: PROVIDERS.GOOGLE;
}

export enum PROVIDERS {
  GOOGLE = 'google',
}

export interface GoogleName {
  familyName: string;
  givenName: string;
}

export interface GoogleEmail {
  value: string;
  verified: boolean;
}

export interface GooglePhoto {
  value: string;
}

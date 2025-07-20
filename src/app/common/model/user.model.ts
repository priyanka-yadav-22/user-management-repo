export interface User {
  id: string;
  name: string;
  language: string;
  bio: string;
  version: number;
  [key: string]: any;
}
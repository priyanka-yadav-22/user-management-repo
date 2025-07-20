import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../model/user.model";
import { users } from "../../mock-data/data";


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor() {}

getUsers(): Observable<User[]> {
  return of(users);
}
}
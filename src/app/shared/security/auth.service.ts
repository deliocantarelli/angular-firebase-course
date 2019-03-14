import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  login(email, password): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }
  async logout(){
    localStorage.removeItem('user');
    return this.afAuth.auth.signOut();
  }
}

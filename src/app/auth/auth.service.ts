import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    token: string;

    constructor(private router: Router){

    }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                    firebase.auth().currentUser.getIdToken().then(tk => this.token = tk);
                    this.router.navigate(['/']);
                },

                error => console.log(error));
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(tk => this.token = tk);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}

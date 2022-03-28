export class AuthService {
    loggedIn: boolean = false;

    login(username: string, password: string){
        
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated(){
        return this.loggedIn;
    }
}
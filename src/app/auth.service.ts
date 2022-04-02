export class AuthService {
    loggedIn: boolean = true;

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
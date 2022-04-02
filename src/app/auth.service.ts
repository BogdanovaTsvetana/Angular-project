export class AuthService {
    loggedIn: boolean = true;
    isAclient: boolean = false;
    isAnanny: boolean = true;

    login(username: string, password: string){
        
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated(){
        return this.loggedIn;
    }

    isClient(){
        return this.isAclient;
    }

    isNanny(){
        return this.isAnanny;
    }
}
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { JwtHelperService } from "@auth0/angular-jwt";


// @Injectable({providedIn:  'root'})
// export class AuthGuard {

//     constructor(private router: Router) {
//     }

//     // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     //     if(state.url === '/welcome') {
//     //         this.router.navigate(['login']);
//     //         return false;
//     //     }
//     //     return true;
//     // }

//     canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
//         // return false;
    
//          if(!this.isAuthenticated() || this.isTokenExpired()){
//             this.router.navigate(['login']);
//             return false;
//         }
//         return true;
//        }
    
//        isAuthenticated() : boolean {
//         const token  = localStorage.getItem("token");
//         return token != null || token != undefined;
//        }
    
//        isTokenExpired() :boolean {
//         const helper = new JwtHelperService();
//         return helper.isTokenExpired(localStorage.getItem("token"));
//        }

// }

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from "@angular/router";
import { JwtService } from "./jwt.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtService: JwtService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.jwtService.getToken();
        if (!token) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}

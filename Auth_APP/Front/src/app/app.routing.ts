import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component'
import { ShopperProfileComponent } from './shopper-profile/shopper-profile.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {  SigninGuard } from './guards/signin.guard';


const routes: Routes = [

    {
        path: 'user',
        children :[
    
            { path: 'profile', component: ShopperProfileComponent, canActivate: [SigninGuard], }, 
            { path: 'register', component: RegisterComponent,},

        ]
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'sign-in', component: SignInComponent, },
    {path: '**',component:NotFoundPageComponent }
]

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }

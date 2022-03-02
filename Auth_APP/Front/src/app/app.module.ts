import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PersonalInfoComponent } from './register/personal-info/personal-info.component';
import { LoginInfoComponent } from './register/login-info/login-info.component';
import { BankInfoComponent } from './register/bank-info/bank-info.component';
import { FooTerComponent } from './components/foo-ter/foo-ter.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifComponent } from './components/notif/notif.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ToastrModule } from 'ngx-toastr';
import { ShopperProfileComponent } from './shopper-profile/shopper-profile.component';
import { AuthentificationInterceptorProvider } from './interceptors/auth.interceptor';
import { NgbdModalBasic } from './components/modal/modal.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CommonModule } from '@angular/common';
import { DeliveryCardShopperComponent } from './components/delivery-card-shopper/delivery-card-shopper.component';
import { UpdatePasswordModelComponent } from './components/update-password-model/update-password-model.component';
import { TrackModalComponent } from './shared/track-modal/track-modal.component';
import { JwtService } from './shared/Services/JWTService.service';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomepageComponent,
        NavigationBarComponent,
        SignInComponent,
        RegisterComponent,
        FooterComponent,
        PersonalInfoComponent,
        LoginInfoComponent,
        ShopperProfileComponent,
        BankInfoComponent,
        FooTerComponent,
        NotifComponent,
        LoadingComponent,
        NotFoundPageComponent,
        NgbdModalBasic,
        DeliveryCardShopperComponent,
        UpdatePasswordModelComponent,
        TrackModalComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300,

        }) // ToastrModule added

    ],
    providers: [AuthentificationInterceptorProvider, JwtService],
    bootstrap: [AppComponent]
})
export class AppModule { }

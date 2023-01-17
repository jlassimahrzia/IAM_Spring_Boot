import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from "@ng-select/ng-select";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { EmployeeComponent } from './views/employee/employee.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { RoleComponent } from './views/role/role.component';
import { AuthorityComponent } from './views/authority/authority.component';
import { HomeComponent } from './views/home/home.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { ProfileComponent } from './views/profile/profile.component';
import { JwtService } from './services/jwt.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    EmployeeComponent,
    SidebarComponent,
    AdminNavbarComponent,
    HeaderComponent,
    CardStatsComponent,
    AdminComponent,
    RoleComponent,
    AuthorityComponent,
    HomeComponent,
    UserDropdownComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

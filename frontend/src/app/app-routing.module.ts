import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthorityComponent } from './views/authority/authority.component';
import { EmployeeComponent } from './views/employee/employee.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { RoleComponent } from './views/role/role.component';


const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "employee", component: EmployeeComponent },
      { path: "role", component: RoleComponent },
      { path: "authority", component: AuthorityComponent },
      { path: "profile", component: ProfileComponent },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  },
  { 
    path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

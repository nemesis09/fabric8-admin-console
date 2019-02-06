import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { DemoComponent } from './components/demo/demo.component';
const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'demo', component: DemoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

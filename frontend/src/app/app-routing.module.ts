import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { SignupComponent } from './pages/signup/signup.component'
import { LoginComponent } from './pages/login/login.component'
import { SearchComponent } from './pages/search/search.component'
import { CommunityComponent } from './pages/community/community.component'
import { CollectionComponent } from './pages/collection/collection.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { AuthGuard } from './guards/auth.guard'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AdminGuard } from './guards/admin.guard'

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		title: 'Home'
	},
	{
		path: 'signup',
		component: SignupComponent,
    title: 'Sign up'
	},
	{
		path: 'login',
		component: LoginComponent,
    title: 'Log in'
	},
	{
		path: 'search',
		component: SearchComponent,
		title: 'Search',
		canActivate: [AuthGuard()]
	},
	{
		path: 'community',
		component: CommunityComponent,
		title: 'Community',
		canActivate: [AuthGuard()]
	},
	{
		path: 'collection',
		component: CollectionComponent,
		title: 'Collection',
		canActivate: [AuthGuard()]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		title: 'Profile',
		canActivate: [AuthGuard()]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		title: 'Dashboard',
    canActivate: [AuthGuard(), AdminGuard()]
	},
	{
		path: '**',
		redirectTo: 'home'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { HeaderComponent } from './components/header/header.component'
import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { NgOptimizedImage } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ButtonDirective } from './directives/button/button.directive'
import { IconComponent } from './components/icon/icon.component'
import { SearchComponent } from './pages/search/search.component'
import { CommunityComponent } from './pages/community/community.component'
import { CollectionComponent } from './pages/collection/collection.component'
import { ProfileComponent } from './pages/profile/profile.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		SignupComponent,
		HeaderComponent,
		AuthFormComponent,
		ButtonDirective,
		IconComponent,
		SearchComponent,
		CommunityComponent,
		CollectionComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgOptimizedImage,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

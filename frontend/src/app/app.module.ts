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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ButtonDirective } from './directives/button/button.directive'
import { IconComponent } from './components/icon/icon.component'
import { SearchComponent } from './pages/search/search.component'
import { CommunityComponent } from './pages/community/community.component'
import { CollectionComponent } from './pages/collection/collection.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BookCardComponent } from './components/book-card/book-card.component'
import { UserCardComponent } from './components/user-card/user-card.component'
import { UrlInterceptor } from './interceptors/url.interceptor'
import { BookDetailComponent } from './pages/book-detail/book-detail.component'
import { FooterComponent } from './components/footer/footer.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { TextCardColorDirective } from './directives/text-card-color/text-card-color.directive';
import { BackgroundCardColorDirective } from './directives/background-card-color/background-card-color.directive';
import { AllBooksListComponent } from './pages/all-books-list/all-books-list.component'

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
		ProfileComponent,
		DashboardComponent,
		BookCardComponent,
		UserCardComponent,
		BookDetailComponent,
		FooterComponent,
  RecommendationsComponent,
  TextCardColorDirective,
  BackgroundCardColorDirective,
  AllBooksListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgOptimizedImage,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: UrlInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

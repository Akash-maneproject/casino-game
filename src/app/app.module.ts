import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MaterialComponentsModule } from './material-components.module';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

import { PokerTableComponent } from './components/poker-table/poker-table.component';

import { NotificationsService } from 'angular2-notifications/src/simple-notifications/services/notifications.service';
import { PokerService } from './services/poker.service';

const appRoutes: Routes = [
	{ path: '', component: PokerTableComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		PokerTableComponent,		
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialComponentsModule,
		RouterModule.forRoot(appRoutes),
		SimpleNotificationsModule.forRoot(),
		PushNotificationsModule
	],
	providers: [
		PokerService,
		NotificationsService,
	],
bootstrap: [AppComponent]
})
export class AppModule { }

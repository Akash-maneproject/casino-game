import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, MatDialogModule } from '@angular/material';

@NgModule({
	imports: [
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		MatDialogModule
	],
	exports: [
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatCardModule,
		MatDialogModule
	]
})
export class MaterialComponentsModule { }

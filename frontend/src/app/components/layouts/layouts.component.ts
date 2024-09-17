import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BlankComponent } from '../../common/components/blank/blank.component';
import { TableComponent } from '../../common/components/table/table.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,NavbarComponent,BlankComponent,TableComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {

}

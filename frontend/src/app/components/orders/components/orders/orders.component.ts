import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {
  orders: OrderModel[] = []
  constructor(
    private _order: OrderService
  ) {}
  
  ngOnInit(): void {
    this._order.getAll(res => this.orders = res);
  }
}

import { Component, OnInit } from '@angular/core';
import { BasketModel } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})

export class BasketsComponent implements OnInit {
  baskets: BasketModel[] = [];
  sum: number = 0;

  constructor(
    private _basket: BasketService,
    private _toastr: ToastrService,
    private _swal: SwalService,
    private _order: OrderService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._basket.getAll(res => {
      this.baskets = res;
      this.calculate();
    });
  }

  calculate() {
    this.sum = 0;
    this.baskets.forEach(element => {
      this.sum += (element.price * element.quantity)
    });
  }

  removeById(_id: string) {
    this._swal.callSwal("Are u delete this product", "Delete Product", "Delete", () => {
      let model = { _id: _id };
      this._basket.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      });
    })
  }

  createOrder(){
    this._swal.callSwal("Are u buy all products","Buy products","Buy", ()=> {
      this._order.create(res=> {
        this._toastr.success(res.message);
        this.getAll();
      });
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../../common/directives/valid.directive';
import { BlankComponent } from '../../common/components/blank/blank.component';
import { TableComponent } from '../../common/components/table/table.component';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../products/service/product.service';
import { ProductModel } from '../products/models/product.model';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/services/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories: CategoryModel[] = [];
  request: RequestModel = new RequestModel();
  products: ProductModel[] = []

  constructor(
    private _category: CategoryService,
    private _product: ProductService,
    private _basket:BasketService,
    private _toastr:ToastrService 
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getAll()
  }

  getCategories() {
    this._category.getAll(res => this.categories = res)
  }

  getAll() {
    this._product.getAllForHomePage(this.request, res => this.products = res)
  }

  changeCategory(categoryId: string, categoryName: string) {
    this.request.categoryName = categoryName;
    this.request.categoryId = categoryId;
    this.getAll()
  }
  addBasket(productId: string, price: number){
    let model = new BasketModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    this._basket.add(model, res=> {
      this._toastr.success(res.message);
      this.getAll();
    });
  }

}

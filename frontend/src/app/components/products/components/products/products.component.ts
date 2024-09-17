import { Component, OnInit } from '@angular/core';
import { PaginationResultModel } from '../../../../common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';
import { RequestModel } from '../../../../common/models/request.model';
import { ProductService } from '../../service/product.service';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(
    private _product: ProductService,
    private _swal: SwalService,
    private _toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getAll()
  }

  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request, res => {
      this.result = res
      this.setPageNumbers()
    })
  }

  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2)
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2)
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i)
    }
  }

  removeById(id: string) {
    this._swal.callSwal("Do you delete this product", "Delete Product", "Delete", () => {
      let model = { _id: id };
      this._product.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll(this.request.pageNumber);
      })
    })
  }

  changeProductStatus(id: string) {
    let model = { _id: id };
    this._product.changeActiveStatus(model, res => {
      this._toastr.info(res.message);
      this.getAll(this.request.pageNumber);
    });
  }

  search() {
    if (this.request.search.length >= 3) {
      this.getAll()
    }
  }

}

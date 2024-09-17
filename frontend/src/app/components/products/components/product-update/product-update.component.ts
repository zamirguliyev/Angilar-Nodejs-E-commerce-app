import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';
import { CategoryModel } from '../../../categories/models/category.model';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  productId: string = "";
  product: ProductModel = new ProductModel();

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _product: ProductService,
    private _router: Router,
    private _activated: ActivatedRoute
  ) {
    this._activated.params.subscribe(res => {
      this.productId = res["value"];
      this.getById();
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getById() {
    let model = { _id: this.productId };
    this._product.getById(model, res => this.product = res);
  }

  getCategories() {
    this._category.getAll(res => this.categories = res);
  }

  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      }
    }
  }

  addImage(imageUrl: string, file: any) {
    this.imageUrls.push(
      { imageUrl: imageUrl, name: file.name, size: file.size }
    );
  }

  update(form: NgForm) {
    if (form.value["categoriesSelect"].length == 0) {
      this._toastr.error("You dont select category");
      return;
    }

    if (form.valid) {
      let product = form.value;
      let categories: string[] = product["categoriesSelect"];
      let price = product["price"];
      price = price.toString().replace(",", ".");

      let formData = new FormData();
      formData.append("_id", this.product._id);
      formData.append("name", this.product.name);
      formData.append("price", price);
      formData.append("stock", product["stock"]);

      for (const category of categories) {
        formData.append("categories", category);
      }

      if (this.images != undefined) {
        for (const image of this.images) {
          formData.append("images", image, image.name);
        }
      }

      this._product.update(formData, res => {
        this._toastr.info(res.message);
        this._router.navigateByUrl("/products");
      });
    }
  }

  deleteImage(_id: string, index: number) {
    let model = {
      _id: _id,
      index: index
    }
    this._product.removeImageByProductIdAndIndex(model, res => {
      this._toastr.warning(res.message);
      this.getById();
    })
  }
}
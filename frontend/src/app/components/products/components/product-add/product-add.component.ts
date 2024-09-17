import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';
import { CategoryModel } from '../../../categories/models/category.model';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective, BlankComponent, TableComponent],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _product: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }


  getCategories() {
    this._category.getAll(res => this.categories = res)
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

  add(form: NgForm) {
    if (form.value["categoriesSelect"].length == 0) {
      this._toastr.error("You dont select category");
      return;
    }
    if (form.valid) {
      let product = form.value;
      let categories: string[] = product["categoriesSelect"];
      let name = product["name"];
      let price = product["price"];
      let stock = product["stock"];
      price = price.toString().replace(",", ".");
      let formData = new FormData();
      formData.append("name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      for (const category of categories) {
        formData.append("categories", category);
      }
      for (const image of this.images) {
        formData.append("images", image, image.name);
      }

      this._product.add(formData, res => {
        this._toastr.success(res.message);
        form.reset();
        this.imageUrls = [];
        this._router.navigateByUrl("/products");
      });
    }
  }

  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex(p => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../../common/directives/valid.directive';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';
import { BlankComponent } from '../../common/components/blank/blank.component';
import { TableComponent } from '../../common/components/table/table.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidDirective,CategoryPipe,BlankComponent,TableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = "";

  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  getAll() {
    this._category.getAll(res => this.categories = res)
  }

  add(form: NgForm) {
    if(form.valid){
      this._category.add(form.controls["name"].value, res=>{
        this._toastr.success(res.message)
        let element = document.getElementById("addModalCloseBtn")
        element?.click()
        form.reset()
        this.getAll()
      })
    }
  }

  get(model:CategoryModel){
    this.updateCategory ={...model}
  }

  update(form:NgForm){
    if(form.valid){
      this._category.update(this.updateCategory,res=>{
        this._toastr.warning(res.message)
        this.getAll()
        let element = document.getElementById("updateModalCloseBtn")
        element?.click()
      })
    }
  }

  removeById(model:CategoryModel){
      this._swal.callSwal(`Do you delete ${model.name} category?`,"","Delete",()=>{
        this._category.removeById(model._id,res=>{
          this._toastr.info(res.message)
          this.getAll()
        })
      })
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { RegisterModel } from '../../models/register.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ValidDirective,BlankComponent,TableComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  model:RegisterModel = new RegisterModel()

  constructor(
    private _auth:AuthService,
    private _toastr:ToastrService,
    private _router:Router
  ){}

  register(form:NgForm){
    if(form.valid){
      this._auth.register(this.model,res=>{
        localStorage.setItem("token", res.token)
        localStorage.setItem("user",JSON.stringify(res.user))
        this._toastr.success("Register Successfuly")
        this._router.navigateByUrl('/')
      })
    }
  }
}

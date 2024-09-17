import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ValidDirective } from '../../../../common/directives/valid.directive';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login-model';
import { ToastrService } from 'ngx-toastr';
import { BlankComponent } from '../../../../common/components/blank/blank.component';
import { TableComponent } from '../../../../common/components/table/table.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ValidDirective,BlankComponent,TableComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _auth:AuthService,
    private _toastr:ToastrService,
    private _router:Router
  ){    }

  login(form:NgForm){
    if(form.valid){
      let model = new LoginModel()
      model.email = form.controls['email'].value;
      model.password = form.controls['password'].value

      this._auth.login(model,res=>{
        this._toastr.success("Login Successfuly")
        localStorage.setItem("token",res.token)
        localStorage.setItem("user",JSON.stringify(res.user))
        this._router.navigateByUrl('/')
      })  
    }
  }
}

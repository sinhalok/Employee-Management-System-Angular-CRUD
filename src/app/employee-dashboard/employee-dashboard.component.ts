import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  employeeModelObj: EmployeeModel = new EmployeeModel();
  
  constructor(private formbuilder: FormBuilder,private api: ApiService){}


  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.getAllEmployee();
      this.formValue.reset();
    },
      err=>{
        alert("Something went Wrong");
      }
    )
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee ID Deleted => "+row.id);  
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showUpdate= true;
    this.showAdd=false;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetail(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Sucessfully");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate=false;  
  }

}

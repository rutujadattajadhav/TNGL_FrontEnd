import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from '../customer/customer-service.service';
import { CustomerBean } from '../customer-bean';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  customerBean:CustomerBean = new CustomerBean("","","","");
  success!:string;
  dataSource!:MatTableDataSource<CustomerBean>;

  constructor( private fb:FormBuilder , private matDilofRef:MatDialogRef<AddComponent>,
     private customerService:CustomerServiceService) { }

  addForm=this.fb.group({
    name: ['',Validators.required],
    customerNumber:[''],
    address:[''],
    meterSerilNumber:['']

  })

  close():void{
    this.matDilofRef.close("cancel");
  }

  save():void{
    this.customerService.addCustomer(this.addForm.value).subscribe((res)=>{
      if(res==="Add Successfully in DB"){
        this.success="Successfully Save";
        this.matDilofRef.close("success");
      }else{
        this.success="please fill the Data";
      }

      },(error)=>{
      this.success="Got error";
        console.log("error got",error);
    },()=>{
        console.log("Complete function call");
    })
  }


  ngOnInit(): void {
  }

}

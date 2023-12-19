import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from '../customer/customer-service.service';
import { CustomerBean } from '../customer-bean';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

message:string="";


  constructor(private fb:FormBuilder, private matDilogRef:MatDialogRef<UpdateComponent>,
    private customerService:CustomerServiceService, @Inject(MAT_DIALOG_DATA)
   private data:CustomerBean) {
      console.log("data got in updateComponent in data property" ,data);
    }

  updateForm=this.fb.group({
    name: ['',Validators.required],
    customerNumber:[''],
    address:[''],
    meterSerilNumber:['']
  });

  update():void{
    this.customerService.updateCustomer(this.updateForm.value).subscribe((res)=>{

      if (res==="Update Successfully in DB"){
        this.message="Update Sussfully"
        this.matDilogRef.close("Update Successfully");
      }else{
        this.message="Customer not found"
      }
      console.log(res);

    }, (error)=>{
      this.message="got somthing error";
    })



  };

  cancle():void{

    this.matDilogRef.close("cancle");
  };


  ngOnInit(): void {
    this.updateForm.setValue(this.data)
  };

}

import { Component, Inject, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer/customer-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  message:string="";

  constructor(private customerService:CustomerServiceService,
     @Inject(MAT_DIALOG_DATA)  private data:string, private matdilogRrf:MatDialogRef<DeleteComponent>) {
      console.log(data);
      }
      cancle():void{
        this.matdilogRrf.close()
      }

  deleteCustomer():void{
    this.customerService.deleteCustomer(this.data).subscribe((res)=>{
      if(res==="Successfully deleted From DB"){
        this.message="Successfully Delete";
        this.matdilogRrf.close("Success");
      }else{
        this.message="Customer Not Found";
      }

    }, (error)=>{
      this.message="got somthing error";
    });

  }

  ngOnInit(): void {
  }

}

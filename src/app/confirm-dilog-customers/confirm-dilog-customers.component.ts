import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerServiceService } from '../customer/customer-service.service';

@Component({
  selector: 'app-confirm-dilog-customers',
  templateUrl: './confirm-dilog-customers.component.html',
  styleUrls: ['./confirm-dilog-customers.component.scss']
})
export class ConfirmDilogCustomersComponent implements OnInit {
  meaasage:string='';

  constructor(private matDilogRef:MatDialogRef<ConfirmDilogCustomersComponent>,
   @Inject(MAT_DIALOG_DATA) private data:string[], private customerService:CustomerServiceService) { }

  close():void{
    this.matDilogRef.close();
  }

  deleteSelectedData():void{

      this.customerService.deleteAllSelectedCustomer(this.data).subscribe((res)=>{
      this.meaasage= res;
      this.matDilogRef.close("Successfully Deleted Cusomer");
    },)

  }

  ngOnInit(): void {
  }

}

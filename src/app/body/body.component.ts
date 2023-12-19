import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerServiceService } from '../customer/customer-service.service';
import { CustomerBean } from '../customer-bean';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { UpdateComponent } from '../update/update.component';
import { DeleteComponent } from '../delete/delete.component';
import { ConfirmDilogCustomersComponent } from '../confirm-dilog-customers/confirm-dilog-customers.component';
import { MatPaginator } from '@angular/material/paginator';

//interface PeriodicElement {
 // name: string;
  //customerNumer: String;
  //meterSerilNumber: String;
  //address: string;
//}

 //const CustomerData:PeriodicElement[]=[
 // {name:"Rutuja", customerNumer:"1",meterSerilNumber:"54", address:"punr" },
  //{name:"Rutuja", customerNumer:"1",meterSerilNumber:"54", address:"punr" },
  //{name:"Rutuja", customerNumer:"1",meterSerilNumber:"54", address:"punr" },
  //{name:"Rutuja", customerNumer:"1",meterSerilNumber:"54", address:"punr" },

//]


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
[x: string]: any;

selection!:Boolean;

customerNumberIds:string[]=[];
  meaasage: string='';
  constructor(public customerService:CustomerServiceService, private dilog:MatDialog ) { }

  dataSource = new MatTableDataSource<CustomerBean>();
  displayedColumns: string[]=['checkbox','customerNumber','name','meterSerilNumber','address','action']

  addopenDilog():void{
    const diglogRef=this.dilog.open(AddComponent,{data:"welcome"});
    diglogRef.afterClosed().subscribe((res)=>{
     // console.log("res :"+res);
      if(res=="success"){
        this.ngOnInit();
      }
    })
  }

    updateOpenDilog(customerBean:CustomerBean):void{
      console.log(customerBean);
    const diglogRefUpdate=  this.dilog.open(UpdateComponent,{data:customerBean});
    diglogRefUpdate.afterClosed().subscribe((resupdate)=>{
      //console.log(resupdate);
      if(resupdate=="Update Successfully"){
        this.ngOnInit();
      }
    })
    }

    customersDeleteOpenDilog():void{
      const ARRAY_LENGTH=this.customerNumberIds.length;
      console.log(ARRAY_LENGTH);
      if(ARRAY_LENGTH!=0){
        const MAT_DILOG_REF= this.dilog.open(ConfirmDilogCustomersComponent,{data:this.customerNumberIds});
        MAT_DILOG_REF.afterClosed().subscribe((resCustomersDelete)=>{
          //console.log(resCustomersDelete)
          if(resCustomersDelete=="Successfully Deleted Cusomer")
          this.ngOnInit();
        })
      }else{
        alert("Please Select the customerNumber which you want to delete")
      }
    }

    deleteOpenDilog(customerNumber:string):void{

     const dilogRefDelete =this.dilog.open(DeleteComponent, {data:customerNumber});
     dilogRefDelete.afterClosed().subscribe((resDelete)=>{
      if(resDelete=="Success"){
        this.ngOnInit();
      }
     })
    }

    getSelectId(ststus:Boolean,customerNumber:string):void{
      console.log(ststus);
      if(ststus){
        this.customerNumberIds.push(customerNumber);
        console.log( "Add element",this.customerNumberIds);
      }else{
       const index:number=this.customerNumberIds.indexOf(customerNumber);
       if(index!= -1){
        this.customerNumberIds.splice(index,1);
        console.log("remove element",this.customerNumberIds);
       }
      }
      console.log("Successfully call")
      console.log(customerNumber);
    }

    getSelectedAll(status1:Boolean,customerNumber:string):void{

    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnInit(): void {
     this.customerService.findAllCustomer().subscribe((res)=>{
     this.dataSource.data=res;
     },((error)=>{}));

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

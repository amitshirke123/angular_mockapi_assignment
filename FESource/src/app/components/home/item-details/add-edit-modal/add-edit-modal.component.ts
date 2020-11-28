import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ItemDataService } from 'src/app/services/item-data.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  itemDetailsForm: FormGroup
  loader = false;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditModalComponent>,
  private itemService: ItemDataService, private matDialog: MatDialog, private fb: FormBuilder) {  
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
      this.dialogRef.updateSize('60%');
      this.itemDetailsForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['',Validators.required],
    });

    if(this.data.action === 'View/Edit'){
      this.setData();
    }
  }


  setData(){
    this.itemDetailsForm.patchValue({
      'name': this.data.formData.name,
      'description': this.data.formData.description,
      'price': this.data.formData.price,
    })


  }


  updateItem(): void {
    this.loader = true;
    let data = {
      'id': this.data.formData.id,
      'name': this.itemDetailsForm.value.name,
      'description': this.itemDetailsForm.value.description,
      'price': this.itemDetailsForm.value.price
    }
    this.itemService.update(this.data.formData.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.loader = false;
          this.dialogRef.close();
        },
        error => {
          this.loader = false;
          console.log(error);
        });
  }


  saveItem(): void {
    this.loader = true;
    

    this.itemService.create(this.itemDetailsForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.loader = false;
          this.dialogRef.close();
        },
        error => {
          this.loader = false;
          console.log(error);
        });
  }



  close(){
    this.dialogRef.close();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemDataService } from 'src/app/services/item-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'description', 'price','action'];
  public dataSource = new MatTableDataSource;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  loader = false;
  filteredOptions: Observable<string[]>;
  products = [];
  product_name: any;

  constructor(private itemService: ItemDataService, private matDialog: MatDialog) {
    // this.config.notFoundText = 'Product not found';
    // this.config.placeholder = 'Select Product';
  }

  ngOnInit(): void {
    this.retrieveProducts();
    this.setupFilter();
  }

  setupFilter() {
    this.dataSource.filterPredicate = (d: Element, filter: string) => {
      const textToSearch = d['name'] && d['name'].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.toLowerCase().includes(filterValue));
  }

  retrieveProducts(): void {
    this.loader = true;
    this.itemService.getAll()
      .subscribe(
        data => {
          this.loader = false;
          this.products = [];
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;

          for (const prod in data) {
            this.products.push({ 'name': data[prod]['product_name'] });
          }

          // this.filteredOptions = this.requestDemoForm.controls.organisation_name.valueChanges
          //     .pipe(
          //       startWith(''),
          //       map(value => this._filter(value))
          //     );
        },
        error => {
          console.log(error);
          this.loader = false;
        });
  }


  deleteItem(product): void {
    this.loader = true;
    this.itemService.delete(product.id)
      .subscribe(
        response => {
          this.loader = false;
          this.retrieveProducts();
        },
        error => {
          console.log(error);
          this.loader = false;
        });
  }


  openAddEditModal(action, element) {

    const dialogConfig = new MatDialogConfig();
    if (action === 'View/Edit') {
      dialogConfig.data = {
        'formData': element,
        'action': action
      };
    } else if (action == 'Add') {
      dialogConfig.data = {
        'action': action
      };
    }
    const dialogRef = this.matDialog.open(AddEditModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.retrieveProducts();
    });

  }

  
  
  onClear(){
    this.retrieveProducts();
  }


}

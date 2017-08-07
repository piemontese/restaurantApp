import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataService } from "../../../services/data.service";
import { DialogService } from '../../../services/dialog.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export interface UserData {
  selected: boolean;
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'pie-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  @Input() multiSelection: boolean = false;
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
//  dataSource: DataService | null;
  public resultDialog: any;
  
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor( private dataService: DataService, private dialogService: DialogService ) { }

  selectItem( row: UserData ) {
    if( !this.multiSelection) {
      //debugger;
      //let data: UserData[] = this.dataSource._exampleDatabase.get();
      for( let i=0; i<this.dataSource._exampleDatabase.data.length; i++ ) {
        this.exampleDatabase.data[i].selected = false;
      }
    }
    row.selected = !row.selected;
    console.log('row: ', row);
  }

  public openDialog( title:string, message:string  ) {
    this.dialogService
  //    .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .confirm(title, message)
      .subscribe(res => this.resultDialog = res);
  }
  
  getSelectedRow() {
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);    
//    this.dataSource = new ExampleDataSource(this.dataService.getUserData(), this.paginator);
    console.log('multiSelection: ', this.multiSelection);
  }

}




/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }
  set data( userData: UserData[]) { this.data = userData }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      selected: false,
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(public _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}

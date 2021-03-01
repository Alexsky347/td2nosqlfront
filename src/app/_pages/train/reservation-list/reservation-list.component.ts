import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {Router} from '@angular/router';
import {BookTrainService} from '../../../_services/booktrain.service';
import {MatTableDataSource} from '@angular/material/table';
import {BookTrain} from '../../../_models';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['bookNumber', 'currentTrain', 'numberPlaces', 'delete'];
  public dataSource = new MatTableDataSource<BookTrain>();
  constructor(
    private bookTrainService: BookTrainService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAll = () => {
    this.bookTrainService.getAll()
      .subscribe(res => {
          this.dataSource.data = res as BookTrain[];
        },
        (error) => {
          this.errorService.handleError(error);
        });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public redirectToDelete = (id: string) => {
    this.bookTrainService.deleteBookTrain(id)
      .pipe(first())
      .subscribe((resp) => {
        console.log('ok: ', resp);
        this.dataSource.data = this.dataSource.data.filter(x => x.bookNumber !== id);
      });
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {first} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {TrainService} from '../../../_services';
import {Train} from '../../../_models';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit  {
  public displayedColumns = ['numTrain', 'villeDepart', 'villeArrivee', 'heureDepart', 'places', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Train>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private trainService: TrainService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAll = () => {
    this.trainService.getAll()
      .subscribe(res => {
        this.dataSource.data = res as Train[];
        },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToCreate = () => {
    const url = `/add`;
    this.router.navigate([url]);

  }
  public redirectToUpdate = (id: string) => {
    const url = `/edit/${id}`;
    this.router.navigate([url]);

  }

  public redirectToDelete = (id: string) => {
    this.trainService.deleteTrain(id)
      .pipe(first())
      .subscribe((resp) => {
        console.log('ok: ', resp);
        this.dataSource.data = this.dataSource.data.filter(x => x.numTrain !== id);
      });
  }

  public redirectToCreateReservation = () => {
    const url = `/addReservation`;
    this.router.navigate([url]);
  }

  public redirectToListReservation = () => {
    const url = `/listReservation`;
    this.router.navigate([url]);
  }

}

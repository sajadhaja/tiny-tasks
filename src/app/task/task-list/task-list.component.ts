/**  
 * @author Sajadh
 * Copyright (c) 2018 COYO GmbH
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so. 
 **/
import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatTable, MatSortable } from "@angular/material";
import { Task } from "../../common/models/task.model";
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskService } from "../../shared/task.service";

@Component({
  selector: "tiny-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"]
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ["select", "name", "priority", "duedate", "assignee", "location", "status", "actions"];
  dataSource: MatTableDataSource<Task>;
  selection = new SelectionModel<Task>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.dataSource = new MatTableDataSource<Task>(tasks);
      });
  }

  ngOnInit() {
    this.sort.sort(<MatSortable>({ id: 'id', start: 'desc' }));
    this.initialiseDatasource();
  }

  initialiseDatasource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      this.taskService.delete(item);
    });
    this.dataSource = new MatTableDataSource<Task>(this.dataSource.data);
    this.selection = new SelectionModel<Task>(true, []);
    this.initialiseDatasource();
  }

  delete(item) {
    this.taskService.delete(item);
    this.dataSource = new MatTableDataSource<Task>(this.dataSource.data);
    this.initialiseDatasource();
  }

  createEdit(item?: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '550px',
      height: '420px',
      data: item ? item : null
    });
    dialogRef.afterClosed().subscribe(result => {
      this.taskService.getTasks()
        .subscribe(tasks => {
          this.dataSource = new MatTableDataSource<Task>(tasks);
          this.initialiseDatasource();
        });

    });
  }
}

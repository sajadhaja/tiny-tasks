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
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../../common/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from "../../shared/task.service";

@Component({
  selector: 'tiny-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  minDate = new Date();

  usersOptions: string[] = ['Me', 'Tom', 'John', 'Marco', 'Stefan', 'Bearnd', 'Hitler'];
  priorityOptions: string[] = ['Low', 'Med', 'High',];

  myform: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    private formBuilder: FormBuilder, private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    console.log(data);
    if (!data) {
      data = { id: 0, name: '', priority: 'Low', duedate: '', assignee: 'Me', location: '', status: 'TODO' };
    }
    this.createForm(data);
  }

  ngOnInit() {

  }

  createForm(data) {
    this.myform = this.formBuilder.group({
      id: data.id,
      name: data.name,
      priority: data.priority,
      duedate: data.duedate,
      assignee: data.assignee,
      location: data.location,
      status:data.status
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    this.myform.touched;
    if (this.myform.valid) {
      console.log("Form Submitted!" + JSON.stringify(this.myform.value));
      this.myform.value.duedate = this.formatDate(this.myform.value.duedate);
      this.taskService.save(this.myform.value)
      this.myform.reset();
      this.dialogRef.close();
    }
  }

  formatDate(dateJson) {
    if (dateJson) {
      let month = (dateJson.getMonth() + 1);
      month = month < 10 ? '0' + month : month;
      return dateJson.getFullYear() + '-' + month + '-' + dateJson.getDate();
    }
    return '';
  }
}

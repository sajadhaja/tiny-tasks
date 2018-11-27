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
import { Injectable } from '@angular/core';
import { Task } from '../common/models/task.model';

import { TASKS } from './mock-task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[];
  nextId: number = 150;
  constructor() {
    console.log("Service instantiation...");
    this.tasks = Object.assign(TASKS);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  save(item: Task) {
    if (!item.id) {
      item.id = ++this.nextId;
      this.tasks.push(item);
      console.log("Added new task id + " + item.id);
    } else {
      let index = this.tasks.map(function (e) { return e.id; }).indexOf(item.id);
      this.tasks.splice(index, 1);
      this.tasks.push(item);
      console.log("Updated task id + " + item.id);
    }

  }

  delete(item: Task): number {
    let index = this.tasks.map(function (e) { return e.id; }).indexOf(item.id);
    this.tasks.splice(index, 1);
    return index;
  }
}

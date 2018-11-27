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
import { NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {LoginComponent} from './login/login.component';
import { TaskListComponent } from './task/task-list/task-list.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes:Routes=[
  { path:'login',component:LoginComponent},
  { path:'tasklist',component:TaskListComponent},
  { path:'dashboard',component:DashboardComponent}, 
  { path:'', redirectTo : '/tasklist', pathMatch:'full'},
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}
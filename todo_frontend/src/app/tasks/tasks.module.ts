import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { Task01Component } from './task01/task01.component';
import { RouterModule, Routes } from '@angular/router';
import { Task02Component } from './task02/task02.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: '01', component: Task01Component },
  { path: '02', component: Task02Component },
];

@NgModule({
  declarations: [TasksComponent, Task01Component, Task02Component],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class TasksModule { }

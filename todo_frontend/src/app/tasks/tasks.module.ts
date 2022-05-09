import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { Task01Component } from './task01/task01.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: '01', component: Task01Component },
];

@NgModule({
  declarations: [TasksComponent, Task01Component],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class TasksModule { }

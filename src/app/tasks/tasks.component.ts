import { Component, input , inject, computed, OnInit,signal} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent implements OnInit {

  userId=input.required<string>();
  order=input<'asc'|'dsc'|undefined>(); 
  // order?:'asc'|'dsc';
  // userTasks: Task[] = [];
  private taskService=inject(TasksService);
  private activatedRoute=inject(ActivatedRoute);
  userTasks=input<Task[]>();

  // userTasks=computed(()=>
  //   this.taskService.allTasks().filter((t)=>
  //      t.userId === this.userId()
  //   ).sort((a,b)=>{
  //     if(this.order()==='dsc'){
  //       return a.id>b.id?-1:1
  //     } else{
  //       return a.id>b.id?1:-1
  //     }
  //   })
  // )

  ngOnInit(): void {
    let order1= '';
    this.activatedRoute.queryParams.subscribe({
      next:(queryParam)=> {
        order1=queryParam['order']
        if (order1 && order1 === 'asc') {
          this.userTasks()?.sort((a, b) => (a.id > b.id ? 1 : -1));
          } else {
            this.userTasks()?.sort((a, b) => (a.id > b.id ? -1 : 1));
          }
      }
      })
     
  }

}

export const tasksResolver:ResolveFn<Task[]>=(
  activatedRouteSnapshot:ActivatedRouteSnapshot,routerStateSnapshot:RouterStateSnapshot
)=>{

  const taskService=inject(TasksService);
  const order=activatedRouteSnapshot.queryParams['order'];

  const usertasks= taskService.allTasks().filter((t)=>
    t.userId === activatedRouteSnapshot.paramMap.get('userId'));

  return usertasks.length?usertasks:[];

}

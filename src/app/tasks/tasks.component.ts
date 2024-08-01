import { Component, input , inject, computed, OnInit,signal} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent implements OnInit {

  userId=input.required<string>();
  order=signal<'asc'|'dsc'>('asc'); 
  // order?:'asc'|'dsc';
  // userTasks: Task[] = [];
  private taskService=inject(TasksService);
  private activatedRoute=inject(ActivatedRoute);


  userTasks=computed(()=>
    this.taskService.allTasks().filter((t)=>
       t.userId === this.userId()
    ).sort((a,b)=>{
      if(this.order()==='dsc'){
        return a.id>b.id?-1:1
      } else{
        return a.id>b.id?1:-1
      }
    })
  )

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe({
      next:(queryParam)=> this.order.set(queryParam['order'])
    })
     
  }

}

import { Component,input,inject,computed, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  imports:[RouterOutlet,RouterLink],
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{

  userId=input.required<string>();
  private userService=inject(UsersService);
  private activeRoute=inject(ActivatedRoute);
  userName='';

  // userName=computed(()=>
  //   this.userService.users.find((u)=>
  //   u.id===this.userId()
  //   )?.name)

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next:(param)=>{
        this.userName=this.userService.users.find((u)=>
        u.id===param.get('userId')
      )?.name || ''; 
    }
    });
  
    }
  
}

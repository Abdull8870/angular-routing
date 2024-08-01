import { Component,input,inject,computed, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet, ResolveFn,
   ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  imports:[RouterOutlet,RouterLink],
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent{

  userId=input.required<string>();
  userName=input.required<string>();
}


export const userResolver:ResolveFn<string>=
(activatedRouteSnapshot:ActivatedRouteSnapshot,routerState:RouterStateSnapshot)=>{
  const userService=inject(UsersService);
  const userName=userService.users.find((u)=>
      u.id===activatedRouteSnapshot.paramMap.get('userId')
    )?.name || ''; 

return userName;
}



import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { titleResolve, userResolver, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { taskRoutes } from "./tasks/tasks.route";
import { inject } from "@angular/core";

export const canMath:CanMatchFn=()=>{
    const router=inject(Router);
    const canMatch=Math.random()
    if(canMatch<1){
        return true;
    }
    return new RedirectCommand(router.parseUrl('unauthorized'));
}

export const routes:Routes=[
    {
        path: '',
        component: NoTaskComponent,
        title:'No Task'
    },
    {
        path:'tasks',
        component:TasksComponent
    },
    {
        path:'users/:userId',
        component:UserTasksComponent,
        children:taskRoutes,
        resolve:{
            userName:userResolver
        },
        title:titleResolve,
        canMatch:[canMath]
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]
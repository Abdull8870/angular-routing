import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { userResolver, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { taskRoutes } from "./tasks/tasks.route";


export const routes:Routes=[
    {
        path: '',
        component: NoTaskComponent
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
        }
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]
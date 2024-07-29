import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";


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
        component:UserTasksComponent
    }
]
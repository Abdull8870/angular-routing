import { Routes } from "@angular/router";
import { canDeactivate, NewTaskComponent } from "./new-task/new-task.component";
import { TasksComponent, tasksResolver } from "./tasks.component";

export const taskRoutes:Routes=[
    {
        path:'',
        redirectTo:'tasks',
        pathMatch:'prefix'
    },
    {
        path:'tasks',
        component:TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve:{
            userTasks:tasksResolver
        }
    },
    {
        path:'tasks/new',
        component:NewTaskComponent,
        canDeactivate:[canDeactivate]
    }

]
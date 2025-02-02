import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router=inject(Router);
  isSubmited=false;

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.router.navigate(['/users',this.userId(),'tasks'],{
      replaceUrl:true
    });
    this.isSubmited=true;
  }
}

export const canDeactivate:CanDeactivateFn<NewTaskComponent>=(component)=>{

  if(component.isSubmited){
    return true;
  }

  if(component.enteredSummary() || component.enteredTitle() || component.enteredDate()){
     return window.confirm('Do you want to go back ?')
  }

  return true;
}

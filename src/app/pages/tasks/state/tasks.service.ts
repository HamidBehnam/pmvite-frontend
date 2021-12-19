import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { catchError, tap } from 'rxjs/operators';
import { Task } from 'src/app/shared/types/task.model';
import { TasksStore } from './tasks.store';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ProjectsQuery } from '../../projects/state/projects.query';
import { ProjectsStore } from '../../projects/state/projects.store';
import { TasksQuery } from './tasks.query';
import { TasksGETRequestMeta } from '../../../shared/types/tasks-get-meta.type';
import { RequestMetaFormat } from '../../../shared/types/request-meta-format.type';

@Injectable({ providedIn: 'root' })
export class TasksService {

  constructor(private http: HttpClient,
              private tasksStore: TasksStore,
              private tasksQuery: TasksQuery,
              private projectsQuery: ProjectsQuery,
              private projectsStore: ProjectsStore) {
  }

  private static tasksGETParamsExtractor(tasksGETRequestMeta: Partial<TasksGETRequestMeta>): RequestMetaFormat {
    return {
      ...tasksGETRequestMeta.sort && {sort: tasksGETRequestMeta.sort},
      ...tasksGETRequestMeta.limit && {limit: tasksGETRequestMeta.limit},
      ...tasksGETRequestMeta.page && {page: tasksGETRequestMeta.page},
      ...tasksGETRequestMeta.status && {'status[]': tasksGETRequestMeta.status}
    };
  }

  private static tasksGETHeadersExtractor(tasksGETRequestMeta: Partial<TasksGETRequestMeta>): RequestMetaFormat {
    return {
      ...tasksGETRequestMeta.projectId && {projectId: tasksGETRequestMeta.projectId},
      ...tasksGETRequestMeta.assigneeUserId && {assigneeUserId: tasksGETRequestMeta.assigneeUserId},
    };
  }

  getTasks(tasksGETRequestMeta?: Partial<TasksGETRequestMeta>): Observable<Task[]> {

    let params: RequestMetaFormat = {};
    let headers: RequestMetaFormat = {};

    if (tasksGETRequestMeta) {
      params = TasksService.tasksGETParamsExtractor(tasksGETRequestMeta);
      headers = TasksService.tasksGETHeadersExtractor(tasksGETRequestMeta);
    }

    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`, {
      params,
      headers
    })
      .pipe(
        tap(tasks => this.tasksStore.set(tasks))
      );
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${taskId}`)
      .pipe(
        tap(task => {
          this.tasksStore.update({
            selectedTask: task
          });

          this.tasksStore.update(taskId, task);
        })
      );
  }

  updateTask(taskId: string, payload: Partial<Task>, storePayload?: Partial<Task>): Observable<Task> {
    const backupTask = this.tasksQuery.getEntity(taskId) || this.tasksQuery.getValue().selectedTask;
    this.updateTaskInStore(taskId, payload, storePayload);

    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${taskId}`, payload)
      .pipe(
        catchError(error => {
          this.updateTaskInStore(taskId, backupTask as Task);
          return throwError(error);
        })
      );
  }

  updateTaskInStore(taskId: string, payload: Partial<Task>, storePayload?: Partial<Task>): void {
    this.tasksStore.update(taskId, storePayload || payload);
    const selectedTask = this.tasksQuery.getValue().selectedTask;

    if (selectedTask && selectedTask._id === taskId) {
      this.tasksStore.update({
        selectedTask: {
          ...selectedTask,
          ...storePayload || payload
        }
      });
    }
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`)
      .pipe(
        tap(_ => {
          this.tasksStore.remove(taskId);
          const selectedProject = this.projectsQuery.getValue().selectedProject;
          if (selectedProject) {
            this.projectsStore.update({
              selectedProject: {
                ...selectedProject,
                tasks: selectedProject.tasks.filter(task => task !== taskId)
              }
            });
          }
        })
      );
  }

  createTask(payload: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, payload)
      .pipe(
        tap(task => {
          this.tasksStore.add(task);
          const selectedProject = this.projectsQuery.getValue().selectedProject;
          if (selectedProject) {
            this.projectsStore.update({
              selectedProject: {
                ...selectedProject,
                tasks: [
                  ...selectedProject.tasks,
                  task._id
                ]
              }
            });
          }
        })
      );
  }

  // add(task: Task) {
  //   this.tasksStore.add(task);
  // }
  //
  // update(id, task: Partial<Task>) {
  //   this.tasksStore.update(id, task);
  // }
  //
  // remove(id: ID) {
  //   this.tasksStore.remove(id);
  // }

  resetSelectedTask(): void {
    this.tasksStore.update({
      selectedTask: null
    });
  }
}

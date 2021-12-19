import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { catchError, tap } from 'rxjs/operators';
import { Project } from '../../../shared/types/project.model';
import { ProjectsStore } from './projects.store';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FileReference } from '../../../shared/types/file-reference.model';
import { ProjectsQuery } from './projects.query';
import { ProjectsGETRequestMeta } from '../../../shared/types/projects-get-meta.type';
import { RequestMetaFormat } from '../../../shared/types/request-meta-format.type';
import { ListResponse } from '../../../shared/types/list-response';

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  constructor(
    private projectsStore: ProjectsStore,
    private projectsQuery: ProjectsQuery,
    private http: HttpClient) {
  }

  private static projectsGETParamsExtractor(projectsGETRequestMeta: Partial<ProjectsGETRequestMeta>): RequestMetaFormat {
    return {
      ...projectsGETRequestMeta.sort && {sort: projectsGETRequestMeta.sort},
      ...projectsGETRequestMeta.limit && {limit: projectsGETRequestMeta.limit},
      ...projectsGETRequestMeta.page && {page: projectsGETRequestMeta.page},
      ...projectsGETRequestMeta.role && {'role[]': projectsGETRequestMeta.role},
      ...projectsGETRequestMeta.status && {'status[]': projectsGETRequestMeta.status},
      ...projectsGETRequestMeta.stat && {'stat[]': projectsGETRequestMeta.stat},
    };
  }

  private static projectsGETHeadersExtractor(projectsGETRequestMeta: Partial<ProjectsGETRequestMeta>): RequestMetaFormat {
    return {
      ...projectsGETRequestMeta.userId && {userId: projectsGETRequestMeta.userId},
      ...projectsGETRequestMeta.excludeInactive && {excludeInactive: projectsGETRequestMeta.excludeInactive},
    };
  }

  getProjects(projectsGETRequestMeta?: Partial<ProjectsGETRequestMeta>): Observable<ListResponse<Project>> {

    let params: RequestMetaFormat = {};
    let headers: RequestMetaFormat = {};

    if (projectsGETRequestMeta) {
      params = ProjectsService.projectsGETParamsExtractor(projectsGETRequestMeta);
      headers = ProjectsService.projectsGETHeadersExtractor(projectsGETRequestMeta);
    }

    return this.http.get<ListResponse<Project>>(`${environment.apiUrl}/projects`, {
      params,
      headers
    })
      .pipe(
        tap(response => {
          this.projectsStore.set(response?.data || []);
          this.projectsStore.update({
            totalCount: response?.total || 0
          });
        })
      );
  }

  getProject(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${environment.apiUrl}/projects/${projectId}`)
      .pipe(
        tap(project => {
          this.projectsStore.update({
            selectedProject: project
          });

          if (project) {
            this.projectsStore.update(projectId, project);
          }
        })
      );
  }

  updateProject(projectId: string, payload: Partial<Project>): Observable<Project> {
    const backupProject = this.projectsQuery.getValue().selectedProject;
    this.updateProjectInStore(projectId, payload);

    return this.http.patch<Project>(`${environment.apiUrl}/projects/${projectId}`, payload)
      .pipe(
        catchError(error => {
          this.updateProjectInStore(projectId, backupProject as Project);
          return throwError(error);
        })
      );
  }

  updateProjectInStore(projectId: string, payload: Partial<Project>): void {
    this.projectsStore.update(projectId, payload);
    this.projectsStore.update({
      selectedProject: {
        ...(this.projectsQuery.getValue().selectedProject as Project),
        ...payload
      }
    });
  }

  uploadProjectImage(projectId: string, imageFile: File): Observable<any> {

    const fieldName = 'image';
    const formData = new FormData();
    formData.append(fieldName, imageFile);

    return this.http.post(`${environment.apiUrl}/projects/${projectId}/images`, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            if (event.body) {
              this.projectsStore.update(projectId, {
                image: event.body as FileReference
              });

              this.projectsStore.update({
                selectedProject: {
                  ...(this.projectsQuery.getValue().selectedProject as Project),
                  image: event.body as FileReference
                }
              });
            }
          }
        })
      );
  }

  createProject(payload: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, payload)
      .pipe(
        tap(project => {
          this.projectsStore.add(project);
        })
      );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}`)
      .pipe(
        tap(_ => {
          this.projectsStore.remove(projectId);
          this.projectsStore.update({
            selectedProject: null
          });
        })
      );
  }

  resetSelectedProject(): void {
    this.projectsStore.update({
      selectedProject: null
    });
  }
}

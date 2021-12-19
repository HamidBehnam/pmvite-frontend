import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Project } from '../types/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsHelpersService {

  constructor() { }

  getProjectImage(project: Project): string {
    return project.image ? `${environment.apiUrl}/projects/${project._id}/images/${project.image._id}` : '';
  }
}

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { catchError, map, tap } from 'rxjs/operators';
import { AttachmentsStore } from './attachments.store';
import { FileReference } from '../../../shared/types/file-reference.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AttachmentForm } from '../../../shared/types/attachment-form.model';
import { AttachmentsQuery } from './attachments.query';
import { ProjectsStore } from '../../projects/state/projects.store';
import { ProjectsQuery } from '../../projects/state/projects.query';

@Injectable({ providedIn: 'root' })
export class AttachmentsService {

  constructor(private http: HttpClient,
              private attachmentsStore: AttachmentsStore,
              private attachmentsQuery: AttachmentsQuery,
              private projectsStore: ProjectsStore,
              private projectsQuery: ProjectsQuery) {
  }


  getProjectAttachments(projectId: string): Observable<FileReference[]> {
    return this.http.get<any>(`${environment.apiUrl}/projects/${projectId}/attachments`)
      .pipe(
        map(response => response.attachments),
        tap(attachments => {
          this.attachmentsStore.set(attachments);
        })
      );
  }

  getProjectAttachmentMeta(projectId: string, attachmentId: string): Observable<FileReference> {
    return this.http.get<FileReference>(`${environment.apiUrl}/projects/${projectId}/attachments/${attachmentId}/meta`)
      .pipe(
        tap(attachment => {
          this.attachmentsStore.update({
            selectedAttachment: attachment
          });

          this.attachmentsStore.update(attachmentId, attachment);
        })
      );
  }

  updateProjectAttachment(projectId: string, attachmentId: string, payload: Partial<AttachmentForm>): Observable<FileReference> {
    const backupAttachment = this.attachmentsQuery.getEntity(attachmentId) || this.attachmentsQuery.getValue().selectedAttachment;
    this.updateProjectAttachmentInStore(attachmentId, payload);

    return this.http.patch<FileReference>(`${environment.apiUrl}/projects/${projectId}/attachments/${attachmentId}`, payload)
      .pipe(
        catchError(error => {
          if (backupAttachment) {
            const attachmentForm: Partial<AttachmentForm> = {
              filename: backupAttachment.filename,
              description: backupAttachment.description || ''
            };

            this.updateProjectAttachmentInStore(attachmentId, attachmentForm);
          }

          return throwError(error);
        })
      );
  }

  updateProjectAttachmentInStore(attachmentId: string, payload: Partial<AttachmentForm>): void {
    const currentAttachmentInStore = this.attachmentsQuery.getEntity(attachmentId) || this.attachmentsQuery.getValue().selectedAttachment;

    const attachmentData: Partial<FileReference> = {
      ...payload.filename && { filename: payload.filename },
      ...(payload.description || payload.description === '') &&
      {
        description: payload.description
      }
    };

    this.attachmentsStore.update(attachmentId, attachmentData);

    const selectedAttachment = this.attachmentsQuery.getValue().selectedAttachment;

    if (selectedAttachment && selectedAttachment._id === attachmentId) {
      this.attachmentsStore.update({
        selectedAttachment: {
          ...selectedAttachment,
          ...attachmentData
        }
      });
    }
  }

  deleteProjectAttachment(projectId: string, attachmentId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/attachments/${attachmentId}`)
      .pipe(
        tap(_ => {
          this.attachmentsStore.remove(attachmentId);

          const selectedProject = this.projectsQuery.getValue().selectedProject;

          if (selectedProject) {
            this.projectsStore.update({
              selectedProject: {
                ...selectedProject,
                attachments: selectedProject.attachments.filter(attachment => attachment !== attachmentId)
              }
            });
          }
        })
      );
  }

  uploadProjectAttachment(projectId: string, attachmentFile: File): Observable<any> {

    const fieldName = 'attachment';
    const formData = new FormData();
    formData.append(fieldName, attachmentFile);

    return this.http.post(`${environment.apiUrl}/projects/${projectId}/attachments`, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            if (event.body) {
              const uploadedFileMeta: FileReference = event.body as FileReference;
              this.attachmentsStore.add(uploadedFileMeta);

              const selectedProject = this.projectsQuery.getValue().selectedProject;

              if (selectedProject) {
                this.projectsStore.update({
                  selectedProject: {
                    ...selectedProject,
                    attachments: [
                      ...selectedProject.attachments,
                      uploadedFileMeta._id
                    ]
                  }
                });
              }
            }
          }
        })
      );
  }

  downloadAttachment(fileUrl: string): Observable<Blob> {
    return this.http.get(fileUrl, {
      responseType: 'blob'
    });
  }


  // add(attachment: Attachment) {
  //   this.attachmentsStore.add(attachment);
  // }

  resetSelectedAttachment(): void {
    this.attachmentsStore.update({
      selectedAttachment: null
    });
  }
}

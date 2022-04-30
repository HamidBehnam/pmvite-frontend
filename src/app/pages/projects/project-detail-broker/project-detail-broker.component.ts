import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectsService } from '../state/projects.service';
import { ProjectsQuery } from '../state/projects.query';
import { Project } from '../../../shared/types/project.model';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ProjectsHelpersService } from '../../../shared/services/projects-helpers.service';
import { MembersService } from '../../members/state/members.service';
import { MembersQuery } from '../../members/state/members.query';
import { Member } from '../../../shared/types/member.model';
import { FormInteractionResult } from '../../../shared/types/form-interacation-result.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectMemberRole } from '../../../shared/types/project-member-role.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from '../../tasks/state/tasks.service';
import { TasksQuery } from '../../tasks/state/tasks.query';
import { Task } from 'src/app/shared/types/task.model';
import { ViewMode } from '../../../shared/types/view-mode.enum';
import { AttachmentsService } from '../../attachments/state/attachments.service';
import { AttachmentsQuery } from '../../attachments/state/attachments.query';
import { FileReference } from '../../../shared/types/file-reference.model';
import { AttachmentForm } from '../../../shared/types/attachment-form.model';
import { PanelQueryParam } from '../../../shared/types/panel-query-param.enum';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { ScrollableTabsDialogComponent } from '../../../shared/components/scrollable-tabs-dialog/scrollable-tabs-dialog.component';
import { UiService } from '../../../shared/services/ui.service';
import { FileDownloadMeta } from '../../../shared/types/file-download-meta';

@Component({
  selector: 'app-project-detail-broker',
  templateUrl: './project-detail-broker.component.html',
  styleUrls: ['./project-detail-broker.component.scss']
})
export class ProjectDetailBrokerComponent implements OnInit, OnDestroy {

  requestedProjectId!: string;
  selectedProject$: Observable<Project | null>;
  members$: Observable<Member[]>;
  tasks$: Observable<Task[]>;
  selectedTask$: Observable<Task | null>;
  attachments$: Observable<FileReference[]>;
  selectedAttachment$: Observable<FileReference | null>;
  uploadProjectImageProgress$: BehaviorSubject<number>;
  uploadProjectAttachmentProgress$: BehaviorSubject<number>;
  closeAttachmentCreationPanel$: Subject<void>;
  closeProjectImageUploadPanel$: Subject<void>;
  pageSection?: number;
  generalSubscription?: Subscription;
  membersSubscription?: Subscription;
  tasksSubscription?: Subscription;
  taskSubscription?: Subscription;
  attachmentsSubscription?: Subscription;
  attachmentSubscription?: Subscription;
  memberAutocompleteLoaderSignal: Subject<string>;
  pageQueryParams?: Params;
  viewMode = ViewMode;
  tasksViewMode: ViewMode;
  attachmentsViewMode: ViewMode;
  selectedTaskId = '';
  selectedAttachmentId = '';
  panelQueryParam = PanelQueryParam;
  memberCreationPanelOpeningSignal: ReplaySubject<void>;
  taskCreationPanelOpeningSignal: ReplaySubject<void>;
  attachmentCreationPanelOpeningSignal: ReplaySubject<void>;
  breadcrumbSections: string[] = [];
  breadcrumbSectionsCache: Map<string, string>;
  isMobileSubscription?: Subscription;

  constructor(public projectsHelpersService: ProjectsHelpersService,
              public authService: AuthService,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private projectsService: ProjectsService,
              private projectsQuery: ProjectsQuery,
              private membersService: MembersService,
              private membersQuery: MembersQuery,
              private tasksService: TasksService,
              private tasksQuery: TasksQuery,
              private attachmentsService: AttachmentsService,
              private attachmentsQuery: AttachmentsQuery,
              private uiService: UiService,
              @Inject(DOCUMENT) private document: Document
  ) {
    this.selectedProject$ = this.projectsQuery.selectSelectedProject$;
    this.members$ = this.membersQuery.selectAll();
    this.tasks$ = this.tasksQuery.selectAll();
    this.uploadProjectImageProgress$ = new BehaviorSubject<number>(0);
    this.uploadProjectAttachmentProgress$ = new BehaviorSubject<number>(0);
    this.closeAttachmentCreationPanel$ = new Subject();
    this.closeProjectImageUploadPanel$ = new Subject();
    this.memberAutocompleteLoaderSignal = new Subject<string>();
    this.tasksViewMode = ViewMode.ListView;
    this.attachmentsViewMode = ViewMode.ListView;
    this.selectedTask$ = this.tasksQuery.selectSelectedTask$;
    this.attachments$ = this.attachmentsQuery.selectAll();
    this.selectedAttachment$ = this.attachmentsQuery.selectSelectedAttachment$;
    this.memberCreationPanelOpeningSignal = new ReplaySubject<void>(1);
    this.taskCreationPanelOpeningSignal = new ReplaySubject<void>(1);
    this.attachmentCreationPanelOpeningSignal = new ReplaySubject<void>(1);
    this.breadcrumbSectionsCache = new Map<string, string>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.requestedProjectId = params['id'];
      this.generalSubscription = this.projectsService.getProject(this.requestedProjectId).subscribe();
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.pageQueryParams = queryParams;
      this.pageSection = queryParams['section'];

      switch (queryParams['section']) {
        case '1':
          this.breadcrumbSections = ['Members'];
          if (queryParams[this.panelQueryParam.MemberCreationPanel] === 'open') {
            this.memberCreationPanelOpeningSignal.next();
          }
          this.membersSubscription = this.membersSubscription ||
            this.membersService.getMembers({
              projectId: this.requestedProjectId
            }).subscribe();
          break;
        case '2':
          this.breadcrumbSections = ['Tasks'];

          if (queryParams['task']) {
            this.tasksViewMode = ViewMode.FocusView;

            if (this.selectedTaskId !== queryParams['task']) {
              this.selectedTaskId = queryParams['task'];
              this.taskSubscription = this.tasksService.getTask(this.selectedTaskId)
                .subscribe(task => {
                  this.breadcrumbSectionsCache.set('Tasks', task.title);
                  this.breadcrumbSections.push(task.title);
                });
            } else {
              const cachedTaskTitle = this.breadcrumbSectionsCache.get('Tasks');
              if (cachedTaskTitle) {
                this.breadcrumbSections.push(cachedTaskTitle);
              }
            }
          } else {
            if (queryParams[this.panelQueryParam.TaskCreationPanel] === 'open') {
              this.taskCreationPanelOpeningSignal.next();
            }
            this.tasksViewMode = ViewMode.ListView;
            this.tasksSubscription = this.tasksSubscription ||
              this.tasksService.getTasks({
                projectId: this.requestedProjectId
              }).subscribe();
          }
          this.membersSubscription = this.membersSubscription ||
            this.membersService.getMembers({
              projectId: this.requestedProjectId
            }).subscribe();
          break;
        case '3':
          this.breadcrumbSections = ['Attachments'];
          if (queryParams['attachment']) {
            this.attachmentsViewMode = ViewMode.FocusView;

            if (this.selectedAttachmentId !== queryParams['attachment']) {
              this.selectedAttachmentId = queryParams['attachment'];
              this.attachmentSubscription =
                this.attachmentsService.getProjectAttachmentMeta(this.requestedProjectId, this.selectedAttachmentId)
                  .subscribe(attachment => {
                    this.breadcrumbSectionsCache.set('Attachments', attachment.filename);
                    this.breadcrumbSections.push(attachment.filename);
                  });
            } else {
              const cachedAttachmentName = this.breadcrumbSectionsCache.get('Attachments');
              if (cachedAttachmentName) {
                this.breadcrumbSections.push(cachedAttachmentName);
              }
            }
          } else {
            if (queryParams[this.panelQueryParam.AttachmentCreationPanel] === 'open') {
              this.attachmentCreationPanelOpeningSignal.next();
            }
            this.attachmentsViewMode = ViewMode.ListView;
            this.attachmentsSubscription = this.attachmentsSubscription ||
              this.attachmentsService.getProjectAttachments(this.requestedProjectId).subscribe();
          }
          break;
        case '4':
          this.breadcrumbSections = ['Settings'];
          break;
        default:
          this.breadcrumbSections = [];
          break;
      }
    });

    this.isMobileSubscription = this.uiService.isMobile.subscribe(isMobile => {
      if (isMobile) {
        this.showScrollableTabsDialogIfNeeded();
      }
    });
  }

  isViewerAtLeastAdmin(project: Project): boolean {
    return project.viewerIsCreator || project.viewerAssociatedRole >= ProjectMemberRole.Admin;
  }

  isViewerAtLeastDeveloper(project: Project): boolean {
    return project.viewerIsCreator || project.viewerAssociatedRole >= ProjectMemberRole.Developer;
  }

  isViewerAtLeastContributor(project: Project): boolean {
    return project.viewerIsCreator || project.viewerAssociatedRole >= ProjectMemberRole.Contributor;
  }

  goToAllProjects(): void {
    this.router.navigate(['projects']);
  }

  onProjectImageFileSelected(project: Project, file: File): void {
    const upload$ = this.projectsService.uploadProjectImage(project._id, file).pipe(
      finalize(() => this.uploadProjectImageProgress$.next(0))
    );

    upload$.subscribe(uploadEvent => {
      if (uploadEvent.type === HttpEventType.UploadProgress) {
        this.uploadProjectImageProgress$.next(Math.round(100 * (uploadEvent.loaded / uploadEvent.total)));
      } else if (uploadEvent.type === HttpEventType.Response) {
        this.closeProjectImageUploadPanel$.next();
        this.matSnackBar.open('Project image was successfully uploaded!', 'OK', {duration: 5000});
      }
    });
  }

  onProjectAttachmentFileSelected(project: Project, file: File): void {
    const upload$ = this.attachmentsService.uploadProjectAttachment(project._id, file).pipe(
      finalize(() => this.uploadProjectAttachmentProgress$.next(0))
    );

    upload$.subscribe(uploadEvent => {
      if (uploadEvent.type === HttpEventType.UploadProgress) {
        this.uploadProjectAttachmentProgress$.next(Math.round(100 * (uploadEvent.loaded / uploadEvent.total)));
      } else if (uploadEvent.type === HttpEventType.Response) {
        this.closeAttachmentCreationPanel$.next();
        this.matSnackBar.open('Attachment was successfully uploaded!', 'OK', {duration: 5000});
      }
    });
  }

  updateUrl(index: number): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        section: index
      }
    });
  }

  saveGeneral(project: Project, payload: Partial<Project>): void {
    this.projectsService.updateProject(project._id, payload).subscribe(_ => {
      this.matSnackBar.open('Project was successfully updated!', 'OK', {duration: 5000});
    }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  saveMember(memberFormInteractionResult: FormInteractionResult<Member>): void {
    this.membersService.updateMember(memberFormInteractionResult.id, memberFormInteractionResult.payload).subscribe(_ => {
      this.matSnackBar.open('Member was successfully updated!', 'OK', {duration: 5000});
    }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  saveTask(taskFormInteractionResult: FormInteractionResult<Task>): void {
    this.tasksService.updateTask(taskFormInteractionResult.id, taskFormInteractionResult.payload, taskFormInteractionResult.storePayload)
      .subscribe(_ => {
        const updatedTask = this.tasksQuery.getValue().selectedTask;

        if (updatedTask) {
          this.breadcrumbSectionsCache.set('Tasks', updatedTask.title);

          if (this.tasksViewMode === ViewMode.FocusView) {
            this.breadcrumbSections.pop();
            this.breadcrumbSections.push(updatedTask.title);
          }
        }

        this.matSnackBar.open('Task was successfully updated!', 'OK', {duration: 5000});
      }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  saveAttachment(attachmentFormInteractionResult: FormInteractionResult<AttachmentForm>): void {
    this.attachmentsService.updateProjectAttachment(this.requestedProjectId,
      attachmentFormInteractionResult.id,
      attachmentFormInteractionResult.payload)
      .subscribe(_ => {
        const updatedAttachment = this.attachmentsQuery.getValue().selectedAttachment;

        if (updatedAttachment) {
          this.breadcrumbSectionsCache.set('Attachments', updatedAttachment.filename);

          if (this.attachmentsViewMode === ViewMode.FocusView) {
            this.breadcrumbSections.pop();
            this.breadcrumbSections.push(updatedAttachment.filename);
          }
        }

        this.matSnackBar.open('Attachment was successfully updated!', 'OK', {duration: 5000});
      }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  downloadAttachment(fileDownloadMeta: FileDownloadMeta): void {
    this.attachmentsService.downloadAttachment(fileDownloadMeta.fileUrl)
      .subscribe(data => {

        const blob = new Blob([data], {type: fileDownloadMeta.contentType});

        const downloadURL = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileDownloadMeta.fileName;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(downloadURL);
          link.remove();
        }, 100);

      }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  deleteMember(memberId: string): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'confirmation-dialog-panel',
      data: {
        title: 'Delete Member',
        okLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.membersService.deleteMember(memberId).subscribe(_ => {
          this.memberAutocompleteLoaderSignal.next('');
          this.matSnackBar.open('Member was successfully removed!', 'OK', {duration: 5000});
          this.tasksSubscription = this.tasksService.getTasks({
            projectId: this.requestedProjectId
          }).subscribe();
          const selectedTask = this.tasksQuery.getValue().selectedTask;
          if (selectedTask) {
            this.taskSubscription = this.tasksService.getTask(selectedTask._id).subscribe();
          }
        });
      }
    });
  }

  deleteTask(taskId: string): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'confirmation-dialog-panel',
      data: {
        title: 'Delete Task',
        okLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.tasksService.deleteTask(taskId).subscribe(_ => {
          this.matSnackBar.open('Task was successfully removed!', 'OK', {duration: 5000});
        });
      }
    });
  }

  deleteAttachment(attachmentId: string): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'confirmation-dialog-panel',
      data: {
        title: 'Delete Attachment',
        okLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.attachmentsService.deleteProjectAttachment(this.requestedProjectId, attachmentId).subscribe(_ => {
          this.matSnackBar.open('Attachment was successfully removed!', 'OK', {duration: 5000});
        });
      }
    });
  }

  deleteProject(): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'confirmation-dialog-panel',
      data: {
        title: 'Delete Project',
        okLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.projectsService.deleteProject(this.requestedProjectId).subscribe(_ => {
          this.router.navigate(['projects']);
          this.matSnackBar.open('Project was successfully removed!', 'OK', {duration: 5000});
        });
      }
    });
  }

  createTask(taskData: Partial<Task>): void {
    this.tasksService.createTask(taskData).subscribe(_ => {
      this.matSnackBar.open('Task was successfully added!', 'OK', {duration: 5000});
    });
  }

  createMember(memberData: Partial<Member>): void {
    this.membersService.createMember(memberData).subscribe(_ => {
      this.memberAutocompleteLoaderSignal.next('');
      this.matSnackBar.open('Member was successfully added!', 'OK', {duration: 5000});
    });
  }

  openTaskInFocusView(task: Task): void {
    if (task._id !== this.selectedTaskId) {
      this.tasksService.resetSelectedTask();
    }

    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        task: task._id
      }
    });
  }

  openAttachmentInFocusView(attachment: FileReference): void {
    if (attachment._id !== this.selectedAttachmentId) {
      this.attachmentsService.resetSelectedAttachment();
    }

    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        attachment: attachment._id
      }
    });
  }

  showProjectTasksList(): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        task: null
      }
    });
  }

  showProjectAttachmentsList(): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        attachment: null
      }
    });
  }

  showCreator(panelQueryParam: PanelQueryParam): void {
    let section;

    switch (panelQueryParam) {
      case PanelQueryParam.MemberCreationPanel:
        section = 1;
        break;
      case PanelQueryParam.TaskCreationPanel:
        section = 2;
        this.pageQueryParams = {
          ...this.pageQueryParams,
          task: null
        };
        break;
      case PanelQueryParam.AttachmentCreationPanel:
        section = 3;
        this.pageQueryParams = {
          ...this.pageQueryParams,
          attachment: null
        };
        break;
    }

    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        section,
        [panelQueryParam]: 'open'
      }
    });
  }

  onCreationPanelOpened(openPanelType: PanelQueryParam): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        [openPanelType]: 'open'
      }
    });
  }

  onCreationPanelClosed(openPanelType: PanelQueryParam): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        [openPanelType]: null
      }
    });
  }

  getTaskDirectLink(project: Project, task: Task): string {
    // const origin = this.document.location.origin;
    return `${environment.baseUrl}/projects/${project._id}?section=2&task=${task._id}`;
  }

  getAttachmentDirectLink(project: Project, attachment: FileReference): string {
    const origin = this.document.location.origin;
    return `${origin}/projects/${project._id}?section=3&attachment=${attachment._id}`;
  }

  showScrollableTabsDialog(): void {
    const dialogRef = this.matDialog.open(ScrollableTabsDialogComponent, {
      disableClose: true,
      panelClass: 'scrollable-tabs-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        localStorage.setItem('scrollableTabsDialogShown', 'true');
      }
    });
  }

  showScrollableTabsDialogIfNeeded(): void {
    if (!localStorage.getItem('scrollableTabsDialogShown') && localStorage.getItem('termsAndConditionsAccepted') === 'true') {
      setTimeout(() => this.showScrollableTabsDialog(), 2000);
    }
  }

  ngOnDestroy(): void {
    this.projectsService.resetSelectedProject();
    this.isMobileSubscription?.unsubscribe();
  }
}

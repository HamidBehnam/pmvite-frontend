import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProfilesService } from '../state/profiles.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { Profile } from '../../../shared/types/profile.model';
import { ProfilesQuery } from '../state/profiles.query';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { ProfilesHelpersService } from '../../../shared/services/profiles-helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from '../../projects/state/projects.service';
import { ProjectsQuery } from '../../projects/state/projects.query';
import { Project } from '../../../shared/types/project.model';
import { ProjectMemberRole } from '../../../shared/types/project-member-role.enum';
import { PanelQueryParam } from '../../../shared/types/panel-query-param.enum';
import { TasksService } from '../../tasks/state/tasks.service';
import { TasksQuery } from '../../tasks/state/tasks.query';
import { Task } from 'src/app/shared/types/task.model';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ScrollableTabsDialogComponent } from '../../../shared/components/scrollable-tabs-dialog/scrollable-tabs-dialog.component';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-profile-detail-broker',
  templateUrl: './profile-detail-broker.component.html',
  styleUrls: ['./profile-detail-broker.component.scss']
})
export class ProfileDetailBrokerComponent implements OnInit, OnDestroy {

  selectedProfile$: Observable<Profile | null>;
  uploadProgress$: BehaviorSubject<number>;
  pageSection?: number;
  pageQueryParams?: Params;
  selectedProfileForProjectsTabSubscription?: Subscription;
  selectedProfileForTasksTabSubscription?: Subscription;
  generalSubscription?: Subscription;
  requestedProfileId!: string;
  projects$: Observable<Project[]>;
  tasks$: Observable<Task[]>;
  projectCreationPanelOpeningSignal: ReplaySubject<void>;
  panelQueryParam = PanelQueryParam;
  closeProfileImageUploadPanel$: Subject<void>;
  breadcrumbSections: string[] = [];
  isMobileSubscription?: Subscription;

  constructor(public profilesHelpersService: ProfilesHelpersService,
              private matDialog: MatDialog,
              private profilesService: ProfilesService,
              private profilesQuery: ProfilesQuery,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private projectsService: ProjectsService,
              private projectsQuery: ProjectsQuery,
              private tasksService: TasksService,
              private tasksQuery: TasksQuery,
              private uiService: UiService
  ) {
    this.selectedProfile$ = this.profilesQuery.selectSelectedProfile$;
    this.uploadProgress$ = new BehaviorSubject<number>(0);
    this.projects$ = this.projectsQuery.selectAll();
    this.tasks$ = this.tasksQuery.selectAll();
    this.projectCreationPanelOpeningSignal = new ReplaySubject<void>(1);
    this.closeProfileImageUploadPanel$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.requestedProfileId = params.id;
      this.generalSubscription = this.profilesService.getProfile(this.requestedProfileId).subscribe();
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.pageQueryParams = queryParams;
      this.pageSection = queryParams.section;

      switch (queryParams.section) {
        case '1':
          this.breadcrumbSections = ['Projects'];
          if (queryParams[this.panelQueryParam.ProjectCreationPanel] === 'open') {
            this.projectCreationPanelOpeningSignal.next();
          }
          this.selectedProfileForProjectsTabSubscription = this.selectedProfileForProjectsTabSubscription ||
            this.selectedProfile$.subscribe(profile => {
              if (profile) {
                this.projectsService.getProjects({
                  role: [
                    ProjectMemberRole.Creator,
                    ProjectMemberRole.Admin,
                    ProjectMemberRole.Developer,
                    ProjectMemberRole.Contributor,
                  ].toString().split(','),
                  userId: profile?.userId,
                  sort: '-createdAt',
                  limit: '100' // currently there's no pagination for user's projects, remove this when pagination is added
                }).subscribe();
              }
            });
          break;
        case '2':
          this.breadcrumbSections = ['Tasks'];
          this.selectedProfileForTasksTabSubscription = this.selectedProfileForTasksTabSubscription ||
            this.selectedProfile$.subscribe(profile => {
              if (profile) {
                this.tasksService.getTasks({
                  assigneeUserId: profile?.userId,
                  limit: '100' // currently there's no pagination for user's tasks, remove this when pagination is added
                }).subscribe();
              }
            });
          break;
        case '3':
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

  updateUrl(index: number): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        section: index
      }
    });
  }

  saveGeneral(profile: Profile, payload: Partial<Profile>): void {
    this.profilesService.updateProfile(profile._id, payload).subscribe(_ => {
      this.matSnackBar.open('Profile was successfully updated!', 'OK', {duration: 5000});
    }, _ => this.matSnackBar.open('Something went wrong, please try again later!', 'OK', {duration: 5000}));
  }

  deleteProfile(profile: Profile): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      panelClass: 'confirmation-dialog-panel',
      data: {
        title: 'Delete Profile',
        okLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.profilesService.deleteProfile(profile._id).subscribe(_ => {
          this.router.navigate(['profiles', 'list']);
        });
      }
    });
  }

  createProject(projectData: Partial<Project>): void {
    this.projectsService.createProject(projectData).subscribe(project => {
      this.goToProjectPage(project);
      this.matSnackBar.open('Project was successfully created!', 'OK', {duration: 5000});
    });
  }

  onProfileImageSelected(profile: Profile, file: File): void {
    const upload$ = this.profilesService.uploadProfileImage(profile._id, file).pipe(
      finalize(() => this.uploadProgress$.next(0))
    );

    upload$.subscribe(uploadEvent => {
      if (uploadEvent.type === HttpEventType.UploadProgress) {
        this.uploadProgress$.next(Math.round(100 * (uploadEvent.loaded / uploadEvent.total)));
      } else if (uploadEvent.type === HttpEventType.Response) {
        this.closeProfileImageUploadPanel$.next();
        this.matSnackBar.open('Profile image was successfully uploaded!', 'OK', {duration: 5000});
      }
    });
  }

  onCreationPanelOpened(panelQueryParam: PanelQueryParam): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        [panelQueryParam]: 'open'
      }
    });
  }

  onCreationPanelClosed(panelQueryParam: PanelQueryParam): void {
    this.router.navigate([], {
      queryParams: {
        ...this.pageQueryParams,
        [panelQueryParam]: null
      }
    });
  }

  getProjectsSectionLabel(profile: Profile): string {
    return profile.viewerIsCreator ? 'My Projects' : 'Projects';
  }

  getTasksSectionLabel(profile: Profile): string {
    return profile.viewerIsCreator ? 'My Tasks' : 'Tasks';
  }

  goToProjectPage(project: Project): void {
    this.router.navigate(['projects', project._id]);
  }

  goToTaskPage(task: Task): void {
    this.router.navigate(['projects', task.project._id], {
      queryParams: {
        section: 2,
        task: task._id
      }
    });
  }

  getTotalProjects(profile: Profile): number {
    const createdProjects = profile.createdProjects ?? []; // || would work as well
    const externalCollaborations = profile.externalCollaborations ?? [];
    return createdProjects.length + externalCollaborations.length;
  }

  getTotalTasks(profile: Profile): number {
    const activeTasks = profile.activeTasks ?? []; // || would work as well
    const acceptedTasks = profile.acceptedTasks ?? [];
    return activeTasks.length + acceptedTasks.length;
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
    this.profilesService.resetSelectedProfile();
    this.selectedProfileForProjectsTabSubscription?.unsubscribe();
    this.selectedProfileForTasksTabSubscription?.unsubscribe();
    this.isMobileSubscription?.unsubscribe();
  }
}

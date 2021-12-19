import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from '../../types/project.model';
import { ProgressStatus } from '../../types/progress-status.enum';
import { getProgressStatusItem, ProgressStatusItem } from '../../types/progress-status-item.model';
import { ProjectMemberRole } from '../../types/project-member-role.enum';
import { getProjectMemberRoleItem, ProjectMemberRoleItem } from '../../types/project-member-role-item.model';
import { Profile } from '../../types/profile.model';
import { Subject, Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-user-projects-list',
  templateUrl: './user-projects-list.component.html',
  styleUrls: ['./user-projects-list.component.scss']
})
export class UserProjectsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() profile!: Profile;
  @Input() projects?: Project[];
  @Input() canEdit?: boolean;
  @Input() projectCreationPanelOpeningSignal: Subject<void>;
  @Output() showProject: EventEmitter<Project>;
  @Output() projectCreationPanelOpened: EventEmitter<void>;
  @Output() projectCreationPanelClosed: EventEmitter<void>;
  @Output() projectCreationRequested: EventEmitter<Partial<Project>>;
  @ViewChild('projectCreationPanel') projectCreationPanel?: MatExpansionPanel;
  projectFormResetSignal: Subject<void>;
  projectCreationPanelOpeningSubscription?: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.showProject = new EventEmitter<Project>();
    this.projectCreationPanelOpened = new EventEmitter<void>();
    this.projectCreationPanelClosed = new EventEmitter<void>();
    this.projectFormResetSignal = new Subject<void>();
    this.projectCreationRequested = new EventEmitter<Partial<Project>>();
    this.projectCreationPanelOpeningSignal = new Subject();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.projectCreationPanelOpeningSubscription = this.projectCreationPanelOpeningSignal.subscribe(_ => {
      this.projectCreationPanel?.open();
      this.changeDetectorRef.detectChanges();
    });
  }

  getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {
    return getProgressStatusItem(progressStatus);
  }

  getProjectMemberRoleItem(project: Project): ProjectMemberRoleItem {
    return getProjectMemberRoleItem(project.viewerIsCreator ? ProjectMemberRole.Creator : project.viewerAssociatedRole);
  }

  getProjectMemberRoleStatement(): string {
    const userRef = this.profile.viewerIsCreator ? `Your` : `${this.profile.firstName}'s`;
    return `${userRef} role in this project is: `;
  }

  goToProjectPage(project: Project): void {
    this.showProject.emit(project);
  }

  onProjectCreationPanelOpened(): void {
    this.projectCreationPanelOpened.emit();
  }

  onProjectCreationPanelClosed(): void {
    this.projectFormResetSignal.next();
    this.projectCreationPanelClosed.emit();
  }

  createProject(project: Partial<Project>): void {
    this.projectCreationRequested.emit(project);
    this.projectCreationPanel?.close();
  }

  ngOnDestroy(): void {
    this.projectCreationPanelOpeningSubscription?.unsubscribe();
  }
}

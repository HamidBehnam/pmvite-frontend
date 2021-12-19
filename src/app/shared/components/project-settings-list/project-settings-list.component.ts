import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FileSpecification } from '../../types/file-specification.model';
import { getProjectImageSpecification } from '../../types/project.model';

@Component({
  selector: 'app-project-settings-list',
  templateUrl: './project-settings-list.component.html',
  styleUrls: ['./project-settings-list.component.scss']
})
export class ProjectSettingsListComponent implements OnInit, OnDestroy {

  @Input() uploadProgress$: BehaviorSubject<number>;
  @Input() closeProjectImageUploadPanel$: Subject<void>;
  @Input() canDeleteProject: boolean;
  @Output() projectImageSelectedForUpload: EventEmitter<File>;
  @Output() projectDeletionRequested: EventEmitter<void>;
  @ViewChild('projectImageUploadPanel') projectImageUploadPanel?: MatExpansionPanel;
  projectImageSpecification: FileSpecification;
  closeProjectImageUploadPanelSubscription?: Subscription;

  constructor() {
    this.uploadProgress$ = new BehaviorSubject(0);
    this.closeProjectImageUploadPanel$ = new Subject();
    this.projectImageSpecification = getProjectImageSpecification();
    this.projectImageSelectedForUpload = new EventEmitter<File>();
    this.projectDeletionRequested = new EventEmitter<void>();
    this.canDeleteProject = false;
  }

  ngOnInit(): void {
    this.closeProjectImageUploadPanelSubscription = this.closeProjectImageUploadPanel$.subscribe(_ =>
      this.projectImageUploadPanel?.close());
  }

  onFileSelected(file: File): void {
    this.projectImageSelectedForUpload.emit(file);
  }

  deleteProject(): void {
    this.projectDeletionRequested.emit();
  }

  ngOnDestroy(): void {
    this.closeProjectImageUploadPanelSubscription?.unsubscribe();
  }
}

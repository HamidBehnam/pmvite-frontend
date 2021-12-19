import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { getProfileImageSpecification } from '../../types/profile.model';
import { FileSpecification } from '../../types/file-specification.model';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-user-settings-list',
  templateUrl: './user-settings-list.component.html',
  styleUrls: ['./user-settings-list.component.scss']
})
export class UserSettingsListComponent implements OnInit, OnDestroy {

  @Input() uploadProgress$: BehaviorSubject<number>;
  @Input() closeProfileImageUploadPanel$: Subject<void>;
  @Output() profileImageSelectedForUpload: EventEmitter<File>;
  @Output() profileDeletionRequested: EventEmitter<void>;
  @ViewChild('profileImageUploadPanel') profileImageUploadPanel?: MatExpansionPanel;
  profileImageSpecification: FileSpecification;
  closeProfileImageUploadPanelSubscription?: Subscription;

  constructor() {
    this.profileImageSelectedForUpload = new EventEmitter<File>();
    this.profileDeletionRequested = new EventEmitter<void>();
    this.profileImageSpecification = getProfileImageSpecification();
    this.uploadProgress$ = new BehaviorSubject<number>(0);
    this.closeProfileImageUploadPanel$ = new Subject();
  }

  ngOnInit(): void {
    this.closeProfileImageUploadPanelSubscription = this.closeProfileImageUploadPanel$.subscribe(_ =>
      this.profileImageUploadPanel?.close());
  }

  onFileSelected(file: File): void {
    this.profileImageSelectedForUpload.emit(file);
  }

  deleteProfile(): void {
    this.profileDeletionRequested.emit();
  }

  ngOnDestroy(): void {
    this.closeProfileImageUploadPanelSubscription?.unsubscribe();
  }
}

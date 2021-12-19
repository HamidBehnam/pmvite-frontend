import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Member } from '../../types/member.model';
import { FormInteractionResult } from '../../types/form-interacation-result.model';
import { ProjectMemberRole } from '../../types/project-member-role.enum';
import { getProjectMemberRoleItem, ProjectMemberRoleItem } from '../../types/project-member-role-item.model';
import { Project } from '../../types/project.model';
import { Subject, Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as moment from 'moment';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() project?: Project;
  @Input() members?: Member[];
  @Input() isEditable?: boolean;
  @Input() memberAutocompleteLoaderSignal: Subject<string>;
  @Input() memberCreationPanelOpeningSignal: Subject<void>;
  @Input() loggedInUserId?: string;
  @Output() memberCreationPanelOpened: EventEmitter<void>;
  @Output() memberCreationPanelClosed: EventEmitter<void>;
  @Output() saveRequested: EventEmitter<FormInteractionResult<Member>>;
  @Output() deleteRequested: EventEmitter<string>;
  @Output() memberCreationRequested: EventEmitter<Partial<Member>>;
  @ViewChild('memberCreationPanel') memberCreationPanel?: MatExpansionPanel;
  memberFormResetSignal: Subject<void>;
  memberCreationPanelOpeningSubscription?: Subscription;
  openMemberPanelId?: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.saveRequested = new EventEmitter<FormInteractionResult<Member>>();
    this.deleteRequested = new EventEmitter<string>();
    this.memberCreationRequested = new EventEmitter<Partial<Member>>();
    this.memberAutocompleteLoaderSignal = new Subject<string>();
    this.memberFormResetSignal = new Subject<void>();
    this.memberCreationPanelOpened = new EventEmitter<void>();
    this.memberCreationPanelClosed = new EventEmitter<void>();
    this.memberCreationPanelOpeningSignal = new Subject();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.memberCreationPanelOpeningSubscription = this.memberCreationPanelOpeningSignal.subscribe(_ => {
      this.memberCreationPanel?.open();
      this.changeDetectorRef.detectChanges();
    });
  }

  getProjectMemberRoleItem(memberRole: ProjectMemberRole): ProjectMemberRoleItem {
    return getProjectMemberRoleItem(memberRole);
  }

  saveMember(member: Member, payload: Partial<Member>): void {
    this.saveRequested.emit({
      id: member._id,
      payload
    });
  }

  deleteMember(member: Member): void {
    this.deleteRequested.emit(member._id);
  }

  createMember(memberData: Partial<Member>): void {
    this.memberCreationRequested.emit(memberData);
    this.memberCreationPanel?.close();
  }

  onMemberCreationPanelOpened(): void {
    this.memberCreationPanelOpened.emit();
  }

  onMemberCreationPanelClosed(): void {
    this.memberFormResetSignal.next();
    this.memberCreationPanelClosed.emit();
  }

  onMemberDetailPanelOpened(member: Member): void {
    this.openMemberPanelId = member._id;
  }

  onMemberDetailPanelClosed(member: Member): void {
    if (this.openMemberPanelId === member._id) {
      this.openMemberPanelId = undefined;
    }
  }

  getMemberCreationDate(member: Member): string {
    return moment(member.createdAt).format('MMMM Do YYYY');
  }

  getMemberPanelDescription(member: Member): string {
    return member._id === this.openMemberPanelId ?
      `Member since ${this.getMemberCreationDate(member)}` :
      this.getProjectMemberRoleItem(member.role).title;
  }

  isMemberRemovable(member: Member): boolean {
    if (this.isEditable && this.project) {
      return member.userId !== this.loggedInUserId || this.project.viewerIsCreator;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.memberCreationPanelOpeningSubscription?.unsubscribe();
  }
}

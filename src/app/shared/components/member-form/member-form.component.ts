import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { getProjectMemberRoleItems, ProjectMemberRoleItem } from '../../types/project-member-role-item.model';
import { ProfilesService } from '../../../pages/profiles/state/profiles.service';
import { Profile } from '../../types/profile.model';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { Project } from '../../types/project.model';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Member } from '../../types/member.model';
import { ProjectMemberRole } from '../../types/project-member-role.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit, OnDestroy {

  @Input() project?: Project;
  @Input() autocompleteListLoaderSignalExternal: Subject<string>;
  @Input() formResetSignal: Subject<void>;
  @Output() createMember: EventEmitter<Partial<Member>>;
  @ViewChild('memberFormRef') memberFormRef?: FormGroupDirective;
  memberFormGroup: FormGroup;
  memberRoleItems!: ProjectMemberRoleItem[];
  profiles?: Observable<Profile[]>;
  loadedProfiles: Profile[] = [];
  selectedProfileId?: string;
  selectedProfile?: Profile;
  selectedProfileIsCreator = false;
  autocompleteListLoaderSignalInternal: Subject<string>;
  formResetSignalSubscription?: Subscription;

  profilesAutocompleteDisplay = (profileId: string): string => {
    const selectedProfile = this.loadedProfiles.find(profile => profile._id === profileId);
    return selectedProfile ? selectedProfile.fullName : '';
  }

  constructor(private profilesService: ProfilesService, private matSnackBar: MatSnackBar) {
    this.createMember = new EventEmitter<Partial<Member>>();
    this.memberFormGroup = new FormGroup({
      profile: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
    this.autocompleteListLoaderSignalInternal = new Subject<string>();
    this.autocompleteListLoaderSignalExternal = new Subject<string>();
    this.formResetSignal = new Subject<void>();
  }

  ngOnInit(): void {
    this.memberRoleItems = getProjectMemberRoleItems(false);

    this.profiles = merge(
      this.memberFormGroup.controls['profile'].valueChanges,
      this.autocompleteListLoaderSignalInternal,
      this.autocompleteListLoaderSignalExternal
    )
      .pipe(
        // the reason for commenting this filter out is because it causes no request be sent if the condition is not applicable and as
        // the result the next time that user starts to type in the autocomplete they'd see wrong result because autocomplete will use
        // the result of the "last" request
        // filter(value => value !== this.selectedProfileId),
        startWith(''),
        debounceTime(400),
        switchMap(value => this.updateProfilesList(value))
      );

    this.formResetSignalSubscription = this.formResetSignal.subscribe(_ => this.resetForm());
  }

  updateProfilesList(searchTerm: string): Observable<Profile[]> {
    // Reasons for adding the following condition:
    // 1) Considering the fact that by clicking on an option in autocomplete input value will be changed to the profile's id,
    // we'd want to make sure that UI won't send a request using the profile id as the search term.
    // Note: you won't see the profile id in the input field because it'll be overwritten by the provided [displayWith] directive.
    // 2) It returns an empty array to make sure next time that user starts to change the
    // search term in the input, UI won't show wrong (previous) list of items.
    if (searchTerm === this.selectedProfileId) {
      return of([]);
    }

    return this.profilesService.getProfilesAutocomplete({
      term: searchTerm,
      projectId: this.project?._id
    }).pipe(
      tap(profiles => this.loadedProfiles = profiles)
    );
  }

  onOptionSelected(selectionEvent: MatAutocompleteSelectedEvent): void {
    this.selectedProfileId = selectionEvent.option.value;

    if (this.selectedProfile?.userId === this.project?.createdBy) {
      this.selectedProfileIsCreator = true;
      this.memberRoleItems = getProjectMemberRoleItems(true);
      this.memberFormGroup.controls['role'].setValue(ProjectMemberRole.Creator);
      this.memberFormGroup.controls['role'].disable();
    } else if (this.selectedProfileIsCreator) {
      this.selectedProfileIsCreator = false;
      this.memberRoleItems = getProjectMemberRoleItems(false);
      this.memberFormGroup.controls['role'].reset();
      this.memberFormGroup.controls['role'].enable();
    }
  }

  onSelectionChange(profile: Profile, optionSelectionChange: MatOptionSelectionChange): void {
    this.selectedProfile = profile;
  }

  submitForm(): void {
    if (this.memberFormGroup.valid) {
      if (this.memberFormGroup.controls['profile'].value !== this.selectedProfileId) {
        this.matSnackBar.open('To add the member please search and select one of the found users.', 'OK', {duration: 5000});
        return;
      }

      this.createMember.emit({
        ...this.memberFormGroup.getRawValue(),
        project: this.project?._id
      });
    }
  }

  triggerFormSubmission(): void {
    if (this.memberFormRef) {
      this.memberFormRef.onSubmit(new Event('submit'));
    }
  }

  resetForm(): void {
    this.memberFormGroup.reset();
    this.memberFormRef?.resetForm();
  }

  ngOnDestroy(): void {
    this.formResetSignalSubscription?.unsubscribe();
  }
}

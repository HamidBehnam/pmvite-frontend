import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from '../../types/profile.model';

@Component({
  selector: 'app-profile-general',
  templateUrl: './profile-general.component.html',
  styleUrls: ['./profile-general.component.scss']
})
export class ProfileGeneralComponent implements OnInit {

  @Input() profile?: Profile;
  @Input() canEdit?: boolean;
  @Output() saveRequested: EventEmitter<Partial<Profile>>;

  constructor() {
    this.saveRequested = new EventEmitter<Partial<Profile>>();
  }

  ngOnInit(): void {
  }

  saveProfile(profile: Partial<Profile>): void {
    this.saveRequested.emit(profile);
  }
}

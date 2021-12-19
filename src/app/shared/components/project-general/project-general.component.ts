import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../types/project.model';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.scss']
})
export class ProjectGeneralComponent implements OnInit {

  @Input() project?: Project;
  @Input() projectIsEditable?: boolean;
  @Output() saveRequested: EventEmitter<Partial<Project>>;

  constructor() {
    this.saveRequested = new EventEmitter<Partial<Project>>();
  }

  ngOnInit(): void {
  }

  saveProject(project: Partial<Project>): void {
    this.saveRequested.emit(project);
  }
}

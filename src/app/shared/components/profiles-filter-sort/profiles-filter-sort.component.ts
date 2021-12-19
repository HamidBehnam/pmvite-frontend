import {
  Component,
  EventEmitter,
  Input,
  KeyValueChangeRecord,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProfilesFilterSortSelection } from '../../types/profiles-filter-sort-selection.type';
import { getProfilesStatFields, ProfilesStatField } from '../../types/profiles-stat-field.model';
import { getProfilesSortByFields, ProfilesSortByField } from '../../types/profiles-sort-by-field.model';
import { getSortOrderFields, SortOrderField } from '../../types/sort-order-field.model';
import { SortOrder } from '../../types/sort-order.enum';
import { ListMetaService } from '../../services/list-meta.service';

@Component({
  selector: 'app-profiles-filter-sort',
  templateUrl: './profiles-filter-sort.component.html',
  styleUrls: ['./profiles-filter-sort.component.scss']
})
export class ProfilesFilterSortComponent implements OnInit, OnChanges {

  @Input() filterAndSortSelection?: ProfilesFilterSortSelection;
  @Output() filterAndSortChanged: EventEmitter<ProfilesFilterSortSelection>;
  filterAndSortForm?: FormGroup;
  keyValueDiffer: KeyValueDiffer<unknown, unknown>;
  statFields: ProfilesStatField[] = getProfilesStatFields();
  sortByFields: ProfilesSortByField[] = getProfilesSortByFields();
  sortOrderFields: SortOrderField[] = getSortOrderFields();
  filterAndSortReset = false;

  constructor(private keyValueDiffers: KeyValueDiffers, private listMetaService: ListMetaService) {
    this.filterAndSortChanged = new EventEmitter<ProfilesFilterSortSelection>();
    this.keyValueDiffer = this.keyValueDiffers.find([]).create();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedFilterAndSortSelection = changes.filterAndSortSelection;

    if (changedFilterAndSortSelection) {
      /*
       form initialization is here instead of the ngOnInit to make sure that the form can be updated after
       the component init cycle, for instance when user resets the selected filter and sort values.
      */
      this.filterAndSortFormInitialization();
    }
  }

  get stat(): FormArray {
    return this.filterAndSortForm?.get('stat') as FormArray;
  }

  get filterAndSortApplied(): boolean {
    return !!this.filterAndSortSelection?.stat.length || this.filterAndSortSelection?.sort !== this.listMetaService.defaultSort;
  }

  filterAndSortFormInitialization(): void {
    if (this.filterAndSortSelection) {
      this.filterAndSortForm = new FormGroup({
        stat: new FormArray(this.statFields.map(statField => new FormControl(this.filterAndSortSelection?.stat.includes(statField.name)))),
        sortBy: new FormControl(
          this.filterAndSortSelection.sort.charAt(0) === '-' ?
            this.filterAndSortSelection.sort.slice(1) :
            this.filterAndSortSelection?.sort
        ),
        sortOrder: new FormControl(
          this.filterAndSortSelection.sort.charAt(0) === '-' ?
            SortOrder.Descending :
            SortOrder.Ascending
        ),
      });
    }
  }

  handleMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  digestFilterAndSortData(): ProfilesFilterSortSelection {
    const sortPrefix = this.filterAndSortForm?.value.sortOrder === SortOrder.Descending ? '-' : '';
    const stat: string[] = [];

    this.filterAndSortForm?.value.stat.forEach((selected: boolean, index: number) => {
      if (selected) {
        stat.push(this.statFields[index].name);
      }
    });

    return {
      sort: sortPrefix + this.filterAndSortForm?.value.sortBy,
      stat
    };
  }

  filterAndSortMenuOpened(): void {
    /*
     this is needed to make sure that the initial snapshot of the object is created, without this even if we change the object values,
     by running the diff function for the "first time" it won't notice the changes because there's no initial snapshot to compare.
    */
    this.keyValueDiffer.diff(this.filterAndSortForm?.value);
  }

  filterAndSortMenuClosed(): void {
    const filterAndSortChanges = this.keyValueDiffer.diff(this.filterAndSortForm?.value);
    let filterAndSortChanged = false;

    if (filterAndSortChanges && !this.filterAndSortReset) {
      filterAndSortChanges.forEachChangedItem((keyValueChangeRecord: KeyValueChangeRecord<unknown, unknown>) =>
        filterAndSortChanged = true);
    }

    if (this.filterAndSortReset) {
      this.filterAndSortReset = false;
    }

    if (filterAndSortChanged) {
      this.filterAndSortChanged.emit(this.digestFilterAndSortData());
    }
  }

  resetFilterAndSortSelection(): void {
    this.filterAndSortReset = true;

    const clearedFilterAndSortSelection: ProfilesFilterSortSelection = {
      stat: [],
      sort: this.listMetaService.defaultSort
    };

    this.filterAndSortSelection = clearedFilterAndSortSelection;
    this.filterAndSortFormInitialization();
    this.filterAndSortChanged.emit(clearedFilterAndSortSelection);
  }
}

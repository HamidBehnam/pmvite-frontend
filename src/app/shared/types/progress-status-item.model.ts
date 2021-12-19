import { ProgressStatus } from './progress-status.enum';

export interface ProgressStatusItem {
  status: ProgressStatus;
  title: string;
}

export function getProgressStatusItems(): ProgressStatusItem[] {
  return [
    {
      status: ProgressStatus.NotStarted,
      title: 'Not Started'
    },
    {
      status: ProgressStatus.InProgress,
      title: 'In Progress'
    },
    {
      status: ProgressStatus.InQA,
      title: 'In QA'
    },
    {
      status: ProgressStatus.InUAT,
      title: 'In UAT'
    },
    {
      status: ProgressStatus.MoreWorkIsNeeded,
      title: 'More work is needed'
    },
    {
      status: ProgressStatus.Done,
      title: 'Done'
    },
    {
      status: ProgressStatus.Accepted,
      title: 'Accepted'
    }
  ];
}

export function getProgressStatusItem(progressStatus: ProgressStatus): ProgressStatusItem {

  const progressStatusItems = getProgressStatusItems();

  return progressStatusItems.find(progressStatusItem => progressStatusItem.status === progressStatus) || progressStatusItems[0];
}

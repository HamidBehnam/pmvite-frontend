export interface FileReference {
  _id: string;
  filename: string;
  path: string;
  size: number;
  uploadedBy: string;
  storageOwner: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export function createFileReference(params: Partial<FileReference>) {
  return {

  } as FileReference;
}

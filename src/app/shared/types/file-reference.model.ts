export interface FileReference {
  _id: string;
  length: number;
  chunkSize: number;
  uploadDate: string;
  filename: string;
  md5: string;
  metadata: any;
}

export function createFileReference(params: Partial<FileReference>) {
  return {

  } as FileReference;
}

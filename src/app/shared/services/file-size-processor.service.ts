import { Injectable } from '@angular/core';
import {SpaceMeasure} from "../types/space-measure.enum";
import {SpaceUnit} from "../types/space-unit.enum";
import {ProcessedFileSize} from "../types/processed-file-size.type";

@Injectable({
  providedIn: 'root'
})
export class FileSizeProcessorService {

  constructor() { }

  process(fileSize: number, fractionDigits: number = 2): ProcessedFileSize {
    let size: string;
    let unit: SpaceUnit;

    if (fileSize > SpaceMeasure.OneMegaByte) {
      unit = SpaceUnit.MB;
      size = (fileSize / SpaceMeasure.OneMegaByte).toFixed(fractionDigits);
    } else if (fileSize > SpaceMeasure.OneKiloByte) {
      unit = SpaceUnit.KB;
      size = (fileSize / SpaceMeasure.OneKiloByte).toFixed(fractionDigits);
    } else {
      unit = SpaceUnit.Bytes;
      size = fileSize.toFixed(2);
    }

    return {
      size,
      unit
    };
  }
}

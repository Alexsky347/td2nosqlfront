import {Train} from './train';

export interface BookTrain  {
  id: string;
  bookNumber: string;
  currentTrain: Train;
  numberPlaces: string;
}

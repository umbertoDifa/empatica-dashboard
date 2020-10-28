import * as functions from 'firebase-functions';
import { augmentData } from './helpers';

export const onDataPointAdded = functions.database
  .ref('/downloads/{download_id}')
  .onCreate(augmentData);

// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Setting } = initSchema(schema);

export {
  Setting
};
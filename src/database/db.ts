import mongoose from 'mongoose';

import { keys } from '../config/keys';
console.log('///////////////');
console.log(keys.MONGODB_URI);

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

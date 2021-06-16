import dotenv from 'dotenv';
dotenv.config();
import './database/db';

import { app } from './app';
import { keys } from './config/keys';

app.listen(keys.PORT, function () {
  console.log(`Server up and running on the port: ${keys.PORT}`);
});

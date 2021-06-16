import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

const User = model('User', UserSchema);
export { User };

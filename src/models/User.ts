import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});

const User = model('User', UserSchema);
export { User };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class WalletDetails {
  walletAddress: string;
  walletName: string;
}

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  walletDetails: WalletDetails;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

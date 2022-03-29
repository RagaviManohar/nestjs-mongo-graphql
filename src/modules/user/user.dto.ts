import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType('WalletDetails')
@InputType('WalletDetailsInput')
class WalletDetails {
  @Field()
  walletAddress: string;

  @Field()
  walletName: string;
}

@ObjectType('UserType')
@InputType('UserInputType')
export class UserType {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  walletDetails: WalletDetails;
}

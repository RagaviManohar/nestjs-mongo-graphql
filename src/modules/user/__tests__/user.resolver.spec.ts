import { Test, TestingModule } from '../../../../test/jest.setup';

import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

import { mockUserDetails, mockUserInput, mockUserList } from './props';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(() => mockUserList),
            create: jest.fn(() => mockUserDetails),
            update: jest.fn(() => mockUserDetails),
            delete: jest.fn(() => mockUserDetails),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should resolver.user be defined', async () => {
    const response = await resolver.user();
    expect(response).toBeDefined();
  });

  it('should resolver.createUser be defined', async () => {
    const response = await resolver.createUser(mockUserInput);
    expect(response).toBeDefined();
  });

  it('should resolver.updateUser be defined', async () => {
    const response = await resolver.updateUser(
      mockUserDetails._id,
      mockUserDetails,
    );
    expect(response).toBeDefined();
  });

  it('should resolver.deleteUser be defined', async () => {
    const response = await resolver.deleteUser(mockUserDetails._id);
    expect(response).toBeDefined();
  });
});

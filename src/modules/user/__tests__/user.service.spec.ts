import {
  Test,
  TestingModule,
  Model,
  getModelToken,
} from '../../../../test/jest.setup';

import { UserService } from '../user.service';
import { User, UserDocument } from '../user.schema';
import { mockUserDetails, mockUserInput, mockUserList } from './props';

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * In all the spy methods/mock methods we need to make sure to
   * add in the property function exec and tell it what to return
   * this way all of our mongo functions can and will be called
   * properly allowing for us to successfully test them.
   */
  it('should trigger service.findAll', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUserList),
    } as any);

    const response = await service.findAll();
    expect(response).toEqual(mockUserList);
  });

  it('should trigger service.create', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementation(jest.fn().mockResolvedValueOnce(mockUserDetails));
    expect(await service.create(mockUserInput)).toBeTruthy();
  });

  it('should trigger service.update', async () => {
    jest
      .spyOn(model, 'findByIdAndUpdate')
      .mockResolvedValueOnce(mockUserDetails);

    const response = await service.update(mockUserDetails._id, mockUserDetails);
    expect(response).toBeTruthy();
  });

  it('should trigger service.delete', async () => {
    // really just returning a truthy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(true as any);
    const response = await service.delete(mockUserDetails._id);
    expect(response).toBeTruthy();
  });
});

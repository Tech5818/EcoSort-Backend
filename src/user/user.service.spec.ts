import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser = {
    id: '123456789',
    provider: 'google',
    email: 'asdf@gmail.com',
    nickname: 'tester',
    photo: 'photo url',
  };

  const mockRepository = {
    findOne: jest.fn().mockReturnValue(mockUser),
    find: jest.fn().mockReturnValue([mockUser]),
    remove: jest.fn().mockReturnValue(mockUser),
    findOneBy: jest.fn().mockReturnValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('return user', async () => {
      const result = await service.findById('123456789');
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123456789' },
      });
    });
  });
});

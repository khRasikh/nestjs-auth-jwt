import { Injectable } from '@nestjs/common';
import { Roles } from './user.enum';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'secureapp.me@gmail.com',
        password: 'secure123',
        roles: [Roles.Admin]
      },
      {
        userId: 2,
        username: 'arefa',
        password: 'arefa123',
        roles: [Roles],
      },
      {
        userId: 3,
        username: 'mahdi',
        password: 'mahdi',
        roles: [Roles],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}

import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/users/user.enum';

export const HasRoles = (...roles: [Roles]) => SetMetadata('roles', roles);
import {SetMetadata} from '@nestjs/common';
import { Role } from 'src/interfaces/user.interface';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
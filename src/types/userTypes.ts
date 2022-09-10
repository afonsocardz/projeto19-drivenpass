import {User} from '@prisma/client';

export type TUserData = Omit<User, 'id'>;
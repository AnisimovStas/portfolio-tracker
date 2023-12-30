import type { User } from './users/entities/user.entity';

declare namespace Express {
  export interface Request {
    user?: User;
  }

  export interface Response {
    user?: User;
  }
}

import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';


export interface ISignInUserResponse {
  user: User;
  token: string;
}


export interface PayloadToken {
  payload:    jwt.JwtPayload;
  expires:    number | string;

}

export interface IUseToken {
  userId:     string;
  isExpired:  boolean;
}


export interface AuthTokenResult {
  userId:   string;
  iat:      number;
  exp:      number;
}
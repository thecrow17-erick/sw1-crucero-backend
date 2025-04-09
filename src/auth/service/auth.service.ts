import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service';
import { AuthTokenResult, ISignInUserResponse, IUseToken, PayloadToken} from '../interfaces';

import { ConfigService } from '@nestjs/config';
import { SignInDto } from '../dto/signIn.dto';
import { IApiResponse } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}


  public async signInUser(signInDto: SignInDto): Promise<ISignInUserResponse>{
    const findUser = await this.userService.findUser({
      where:{
        email: signInDto.email
      }
    });

    if(!findUser) 
      throw new NotFoundException("Usuario no encontrado");

    const isPass = this.userService.isPass(signInDto.password,findUser.password);
    if(!isPass)
      throw new UnauthorizedException("Ingrese el password correcto");

    try {
      const token = this.signJwt({
        payload: {
          userId: findUser.id
        },
        expires: 10 * 24 * 60 * 60
      });
      return {
        user: findUser,
        token
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    } 
  }


  private signJwt(payloadToken: PayloadToken): string{
    return this.jwtService.sign(payloadToken.payload, {
      secret: this.configService.get<string>('secret_jwt'),
      expiresIn: payloadToken.expires
    })
  }

  public useToken(token: string): IUseToken | string {
    try {
      const decode = this.jwtService.decode(token) as AuthTokenResult;

      const currentDate = new Date();
      const expiresDate = new Date(decode.exp);

      return {
        userId: decode.userId,
        isExpired: +expiresDate <= +currentDate / 1000
      }
    } catch (error) {
      return "Token invalido";
    }
  }
}

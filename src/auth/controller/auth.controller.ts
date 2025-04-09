import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { IApiResponse } from 'src/common/interfaces';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service';
import { AuthService } from '../service';
import { SignInDto } from '../dto/signIn.dto';
import { ISignInUserResponse } from '../interfaces';

@Controller('auth')
export class AuthController {


  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ){}


  @Post("user/sign-up")
  @HttpCode(HttpStatus.CREATED)
  public async createUserSignUp(@Body()createUserDto :CreateUserDto ): Promise<IApiResponse<User>> {
    const statusCode = HttpStatus.CREATED;
    const createUser = await this.userService.createUser(createUserDto);
    return {
      statusCode,
      message: "Usuario creado",
      data: createUser
    }
  }

  @Post("user/sign-in")
  @HttpCode(HttpStatus.OK)
  public async signInUser(@Body() signInDto: SignInDto): Promise<IApiResponse<ISignInUserResponse>> {
    const statusCode = HttpStatus.OK;
    const signIn = await this.authService.signInUser(signInDto);
    return {
      statusCode,
      message: "Usuario logeado correctamente",
      data: signIn
    }
  
  }

}


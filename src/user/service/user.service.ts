import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


import { PrismaService } from 'src/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { OptionUser } from '../interfaces';

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService
  ){}



  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const finsUser = this.findUser({
      where: {
        email: createUserDto.email
      }
    });
    if(finsUser)
      throw new BadRequestException("Ya existen cuenta vinculada con el correo")
    
    try{
      const hassPass = this.hashPass(createUserDto.password);
      const createUser = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          password: hassPass,
          wallet_address: "",
          email: createUserDto.email,
        }
      });
      return createUser;
    }catch(ex){
      throw new InternalServerErrorException(ex);
    }
  }


  public async findUser(option?: OptionUser): Promise<User> {
    const findUser = await this.prismaService.user.findFirst({
      where: option.where,
      select: option.select
    })
    return findUser;
  }

  private hashPass(pass: string, salt: number = 10): string {
    const salts = bcrypt.genSaltSync(salt);
    return bcrypt.hashSync(pass,salts);
  }

  public isPass(pass: string, hash: string): boolean {
    return bcrypt.compareSync(pass,hash);
  }

}
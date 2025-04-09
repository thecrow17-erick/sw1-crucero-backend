import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  
  @IsString()
  @MinLength(3)
  name: string;


  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

}
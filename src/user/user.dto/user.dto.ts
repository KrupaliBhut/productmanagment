import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  created_at: Date;

  updated_at: Date;

  userId: number;

  roleId: number;

  assignedBy: string;
}

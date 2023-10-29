import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({where: {username}})

    if(!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMach = await bcrypt.compare(password, user.password)

    if(!passwordMach){
      throw new UnauthorizedException('Invalid credentials')
    }

    if(user && passwordMach){
      return {
        userId: user.id,
        username: user.username,
        email: user.email
      }
    }

    return null
  }

  async register(userDto: CreateUserDto){
    const hashedPassword = await bcrypt.hash(userDto.password, 10)


    const existingByUserName = await this.usersService.findOne({where: {username: userDto.username}})
    const existingByEmail = await this.usersService.findOne({where: {email: userDto.email}})

    if(existingByUserName){
      return {warningMessage: 'Пользователь с таким именем существует'}
    }

    if(existingByEmail){
      return {warningMessage: 'Пользователь с таким email уже существует'}
    }

    const newUser = await this.usersService.create({...userDto, password: hashedPassword})

    const {password, ...result} = newUser['dataValues']

    return result
  }

}

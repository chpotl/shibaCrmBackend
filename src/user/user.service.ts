import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new BadRequestException('user with such email already exist');
    }
    const hash = await bcrypt.hash(createUserDto.password, 2);
    return await this.userModel.create({
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      password: hash,
    });
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async findAll() {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('user not found');
    }
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}

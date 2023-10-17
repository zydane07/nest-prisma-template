import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, name } = createUserDto;

      const users = await this.prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return users;
    } catch (error) {
      console.log(error);

      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2002') throw new ConflictException();
      return 'error';
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { User } from './../user.interface';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }

    @Get()
    async find(): Promise<User[]> {
        return await this.usersService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return await this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() body: User): Promise<void> {
        await this.usersService.create(body);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: User
    ): Promise<void> {
        await this.usersService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.usersService.delete(id);
    }
}

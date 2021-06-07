import { User } from './../user.interface';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) { }

    @Get()
    public find(): Observable<User[]> {
        return this.usersService.find();
    }

    @Get(':id')
    public findOne(@Param('id') id: string): Observable<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    public create(@Body() body: User): Observable<void> {
        return this.usersService.create(body);
    }

    @Put(':id')
    public update(
        @Param('id') id: string,
        @Body() body: User
    ): Observable<void> {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param('id') id: string): Observable<void> {
        return this.usersService.delete(id);
    }
}

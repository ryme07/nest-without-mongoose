import { IsEmail, IsNotEmpty, IsInt } from 'class-validator'
export class User {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsInt()
    age: number;
}



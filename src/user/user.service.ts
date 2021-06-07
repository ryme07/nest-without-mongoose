import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectID } from 'mongodb';
import { User } from 'src/user.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
    ) { }

    async find(): Promise<User[]> {
        return await this.db.collection('users').find().toArray();
    }

    async findOne(id: string): Promise<User> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        const response = await this.db.collection('users').findOne({
            _id: new ObjectID(id),
        });

        if (!response) {
            throw new NotFoundException;
        }

        return response;
    }

    async create(body: User): Promise<void> {
        await this.db.collection('users').insert(body);
    }

    async update(id: string, body: User): Promise<void> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        await this.db.collection('users').updateOne(
            {
                _id: new ObjectID(id),
            },
            {
                $set: {
                    ...body,
                },
            },
        );
    }

    async delete(id: string): Promise<void> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        const response = await this.db.collection('users').deleteOne({
            _id: new ObjectID(id),
        });

        if (response.deletedCount === 0) {
            throw new NotFoundException;
        }
    }
}

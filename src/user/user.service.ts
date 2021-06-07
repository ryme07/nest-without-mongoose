import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Db, ObjectID } from 'mongodb';
import { Observable } from 'rxjs';
import { User } from 'src/user.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
    ) { }

    public find(): Observable<User[]> {
        return this.db.collection('users').find().toArray();
    }

    public findOne(id: string): Observable<User> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        const response = this.db.collection('users').findOne({
            _id: new ObjectID(id),
        });

        if (!response) {
            throw new NotFoundException;
        }

        return response;
    }

    public create(body: User): Observable<void> {
        return this.db.collection('users').insert(body);
    }

    public update(id: string, body: User): Observable<void> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        return this.db.collection('users').updateOne(
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

    public delete(id: string): Observable<void> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException;
        }

        const response = this.db.collection('users').deleteOne({
            _id: new ObjectID(id),
        });

        if (response.deletedCount === 0) {
            throw new NotFoundException;
        }

        return response;
    }
}

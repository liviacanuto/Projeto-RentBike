//user
import crypto from 'crypto';
import { UserRepo } from "../ports/user-repo";
import { User } from "../user";
import connection from "./database";


export class UserRepositoryTrue implements UserRepo {
    async find(email: string): Promise<User> {
        const [rows] = await connection.execute<User[]>('SELECT * FROM User WHERE Email = ?', [email]);
        const found = rows?.[0];
        if (found) {
            found.id = found.IDUser;
        }
        return found;
    }

    async add(user: User): Promise<string> {
        const newId = crypto.randomUUID()
        user.id = newId
        await connection.execute(
            'INSERT INTO User (name, email, password, IDUser) VALUES (?, ?, ?, ?)',
            [user.name, user.email, user.password, user.id]
        );
        return user.id;
    }

    async remove(email: string): Promise<void> {
        await connection.execute('DELETE Rent.* FROM Rent JOIN User ON Rent.IDUser = User.IDUser WHERE User.email = ?', [email])
        await connection.execute('DELETE FROM User WHERE Email = ?', [email]);
    }


    async list(): Promise<User[]> {
        const [rows] = await connection.execute<User[]>('SELECT * FROM User');
        return rows;
    }
}

export default new UserRepositoryTrue()


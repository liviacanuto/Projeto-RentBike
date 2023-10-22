import crypto from 'crypto';
import { RentRepo } from "../ports/rent-repo";
import { Rent } from "../rent";
import bikeRepositoryTrue from "./bike-repository-true";
import connection from "./database";
import userRepositoryTrue from "./user-repository-true";


export class RentRepositoryTrue implements RentRepo {

    async find(id: string): Promise<Rent> {
        const [rows] = await connection.execute<Rent[]>('SELECT * FROM Rent WHERE IDRent = ?', [id]);
        return rows?.[0];
    }

    async add(rent: Rent): Promise<string> {
        const newId = crypto.randomUUID()
        rent.id = newId
        console.log(rent);
        await connection.execute(
            'INSERT INTO Rent (IDBike, IDUser, StartDate, IDRent) VALUES (?, ?, ?, ?)',
            [rent.bike.id, rent.user.id, rent.start, rent.id]
        );
        return rent.id;
    }

    async findOpen(bikeId: string, userEmail: string): Promise<Rent> {
        const query = 'SELECT Rent.* FROM Rent JOIN User ON Rent.IDUser = User.IDUser WHERE Rent.IDBike = ? AND User.email = ? AND EndDate IS NULL';
        const values = [bikeId, userEmail];

        const [rows] = await connection.execute(query, values);
        const rent: Rent = rows?.[0];
        if (rent) {
            rent.bike = await bikeRepositoryTrue.find(bikeId);
            rent.user = await userRepositoryTrue.find(userEmail);
            const result = new Rent(rent.bike, rent.user, rent.StartDate, rent.IDRent);
            result.end = rent.EndDate;
            return result;
        }
        return rent;
    }

    async findOpenFor(userEmail: string): Promise<Rent[]> {
        const query = 'SELECT Rent.* FROM Rent JOIN User ON Rent.IDUser = User.IDUser WHERE User.email = ? AND EndDate IS NULL';
        const values = [userEmail];
        const [rows] = await connection.execute<Rent[]>(query, values);
        const rents = await Promise.all(rows.map(async (rent) => {
            rent.bike = await bikeRepositoryTrue.find(rent.IDBike);
            rent.user = await userRepositoryTrue.find(userEmail);
            const result = new Rent(rent.bike, rent.user, rent.StartDate, rent.IDRent);
            result.end = rent.EndDate;
            return result;
        }))

        return rents;

    }

    async update(id: string, rent: Rent): Promise<void> {
        const result = await connection.execute(
            'UPDATE Rent SET IDBike = ?, IDUser = ?, EndDate = ? WHERE IDRent = ?',
            [rent.bike.id, rent.user.id, rent.end, id]
        );
    }

    async list(): Promise<Rent[]> {
        const [rows] = await connection.execute<Rent[]>('SELECT * FROM Rent');
        return rows;
    }
}

export default new RentRepositoryTrue()

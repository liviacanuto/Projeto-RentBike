
//rent
import { Rent } from "../rent";
import { RentRepo } from "../ports/rent-repo";
import connection from "./database";
import crypto from 'crypto'


export class RentRepositoryTrue implements RentRepo {
    findOpen(bikeId: string, userEmail: string): Promise<Rent> {
        throw new Error("Method not implemented.");
    }
    findOpenFor(userEmail: string): Promise<Rent[]> {
        throw new Error("Method not implemented.");
    }
    
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

    async findOpen(bikeId: string, userEmail: string): Promise<Rent>{
        const query = 'SELECT * FROM Rent WHERE IDBike = ? AND IDUser = ? AND EndDate IS NULL';
        const values = [bikeId, userEmail];
    
        try {
            const [rows] = await connection.execute(query, values);
            if (rows.length > 0) {
                return rows[0];
            }  
    }

    async findOpenFor(userEmail: string): Promise<Rent[]> {
        const query = 'SELECT * FROM Rent WHERE IDUser = ? AND EndDate IS NULL';
        const values = [userEmail];
    
        try {
            const [rows] = await connection.execute(query, values);
            return rows;
        }
    }

    async update(id: string, rent: Rent): Promise<void> {
        const result = await connection.execute(
            'UPDATE Rent SET bike = ?, user = ?, start = ? WHERE IDRent = ?',
            [rent.bike.id, rent.user.id, rent.start, id]
        );
    }

    async list(): Promise<Rent[]> {
        const [rows] = await connection.execute<Rent[]>('SELECT * FROM Rent');
        return rows;
    }
}

export default new RentRepositoryTrue()

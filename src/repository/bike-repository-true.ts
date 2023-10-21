import { Bike } from "../bike";
import { BikeRepo } from "../ports/bike-repo";
import connection from "./database";
import crypto from 'crypto'


export class BikeRepositoryTrue implements BikeRepo {
    async find(id: string): Promise<Bike> {
        const [rows] = await connection.execute<Bike[]>('SELECT * FROM Bike WHERE IDBike = ?', [id]);
        return rows?.[0];
    }

    async add(bike: Bike): Promise<string> {
        const newId = crypto.randomUUID()
        bike.id = newId
        await connection.execute(
            'INSERT INTO Bike (name, type, bodySize, maxLoad, rate, description, ratings, imageUrls, available, latitude, longitude, IDBike) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.imageUrls, bike.available, bike.location.latitude, bike.location.longitude, bike.id]
        );
        return bike.id;
    }

    async remove(id: string): Promise<void> {
        await connection.execute('DELETE FROM Bike WHERE IDBike = ?', [id]);
    }

    async update(id: string, bike: Bike): Promise<void> {
        const result = await connection.execute(
            'UPDATE Bike SET name = ?, type = ?, bodySize = ?, maxLoad = ? , rate = ? , description = ?, ratings = ?, imageUrls = ?, available = ?, latitude = ?, longitude = ?, IDBike = ?',
            [bike.name, bike.type, bike.bodySize, bike.maxLoad, bike.rate, bike.description, bike.ratings, bike.imageUrls, bike.available, bike.location.latitude, bike.location.longitude, bike.id]
        );
    }

    async list(): Promise<Bike[]> {
        const [rows] = await connection.execute<Bike[]>('SELECT * FROM Bike');
        return rows;
    }
}

export default new BikeRepositoryTrue()

import { RowDataPacket } from "mysql2";
import { Bike } from "./bike";
import { User } from "./user";

export class Rent implements RowDataPacket {
    public end: Date = undefined

    constructor(
        public bike: Bike,
        public user: User,
        public start: Date,
        public id?: string
    ) {}
    [column: number]: any;
    [column: string]: any;
    ["constructor"]: { name: "RowDataPacket"; };
}


import { RowDataPacket } from "mysql2";

export class User implements RowDataPacket {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string
    ) {}
    [column: number]: any;
    [column: string]: any;
    ["constructor"]: { name: "RowDataPacket"; };
}
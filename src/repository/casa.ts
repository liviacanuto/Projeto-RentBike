import { RowDataPacket } from "mysql2";
export interface ICasa extends RowDataPacket {
    nome: string,
    cor: string,
    numero: number,
    id?: string
}

export class Casa implements ICasa {
    [column: number]: any;
    [column: string]: any;
    ["constructor"]: { name: "RowDataPacket"; };
    constructor(public id: string, public nome: string, public cor: string, public numero: number) { }

}
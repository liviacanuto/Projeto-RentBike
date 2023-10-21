import { ICasa } from "./casa";
import connection from "./database";

interface ICasaRepository {
  add(casa: ICasa): Promise<ICasa>;
  findAll(): Promise<ICasa[]>;
  findById(casaId: string): Promise<ICasa | undefined>;
  update(casa: ICasa): Promise<string>;
  delete(casaId: string): Promise<void>;
  deleteAll(): Promise<void>;
}

class CasaRepository implements ICasaRepository {
  async add(casa: ICasa): Promise<ICasa> {
    const result = await connection.execute(
      'INSERT INTO Casa (id, nome, cor, numero) VALUES (?, ?, ?, ?)',
      [casa.id, casa.nome, casa.cor, casa.numero]
    );
    return casa;
  }

  async findAll(): Promise<ICasa[]> {
    const [rows] =  await connection.execute<ICasa[]>('SELECT * FROM Casa LIMIT 1');
    return rows;
  }

  async findById(casaId: string): Promise<ICasa | undefined> {
    const [rows] = await connection.execute<ICasa[]>('SELECT * FROM Casa WHERE id = ?', [casaId]);
    return rows?.[0];
  }

  async update(casa: ICasa): Promise<string> {
    const result = await connection.execute(
      'UPDATE Casa SET nome = ?, cor = ?, numero = ? WHERE id = ?',
      [casa.nome, casa.cor, casa.numero, casa.id]
    );
    return casa.id;
  }

  async delete(casaId: string): Promise<void> {
    await connection.execute('DELETE FROM Casa WHERE id = ?', [casaId]);
  }

  async deleteAll(): Promise<void> {
    const result = await connection.execute('DELETE FROM Casa');
  }
}

export default new CasaRepository();
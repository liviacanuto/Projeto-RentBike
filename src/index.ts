import { App } from "./app";
import bikeRepositoryTrue from "./repository/bike-repository-true";
import rentRepositoryTrue from "./repository/rent-repository-true";
import userRepositoryTrue from "./repository/user-repository-true";


const app = new App(userRepositoryTrue, bikeRepositoryTrue, rentRepositoryTrue);

async function fazerConsultaUser() {
    //* TO DO *//
    // => codigo para rodar fica aqui

    const users = await app.listUsers()
    console.log('------LISTA DE USERS ------')
    console.log(users)


    const userEncontrado = await app.findUser('bla')
    console.log('-----USUARIO COM EMAIL bla ------')
    console.log(userEncontrado)
}

fazerConsultaUser();
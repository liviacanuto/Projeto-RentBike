import { Bike } from "./bike";
import { User } from "./user";
import userRepositoryTrue from "./repository/user-repository-true";
import { Location } from "./location";
import { App } from "./app";
import bikeRepositoryTrue from "./repository/bike-repository-true";
import rentRepositoryTrue from "./repository/rent-repository-true";


async function fazerConsultaBike() {
    // BikeRepositoryTrue.add(new Bike('caloi', 'verde', 5, 8, 5, 'tem', 8, [''], true, , 'xy'));
    const location2 = new Location(1.1, 1.1);
    const bike = new Bike('hgf', 'verde', 4, 3, 2, 'tem', 1, [''], true, location2);
    bikeRepositoryTrue.find('xyyr').then((x) => {
        console.log("-------------- BIKE ---------------")
        console.log(x);
    })

    bikeRepositoryTrue.update('xyyr', bike)

}

async function fazerConsultaUser() {
    // userRepositoryTrue.add(new User('name', 'email@xxx', 'password'))
    // userRepositoryTrue.add(new User('name', 'email@xxx', 'password'))
    // userRepositoryTrue.list().then((x) => {
    //     console.log("-------------- USER ---------------")
    //     console.log(x);
    // });

    // userRepositoryTrue.find('x').then((x) => {
    //     console.log(x);
    // });

}

async function fazerConsultaRent() {
    const app = new App(userRepositoryTrue, bikeRepositoryTrue, rentRepositoryTrue);
    const total = app.returnBike('xyyr', 'email@xxx')
    console.log(total)
}

// fazerConsultaUser();
// fazerConsultaBike();
fazerConsultaRent();


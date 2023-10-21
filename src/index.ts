import { Bike } from "./bike";
import { Location } from "./location";
import bikeRepositoryTrue from "./repository/bike-repository-true";
import BikeRepositoryTrue from "./repository/bike-repository-true";

async function fazerConsulta() {
    // BikeRepositoryTrue.add(new Bike('caloi', 'verde', 5, 8, 5, 'tem', 8, [''], true, , 'xy'));
    const location2 = new Location(1.1, 1.1);
    const bike = new Bike('fdaf', 'aazul', 4, 3,2, 'tem', 1, [''], true, location2, 'xyyr');
    bikeRepositoryTrue.add(bike)
    BikeRepositoryTrue.list().then((x) => {
        console.log(x);
    })

}

fazerConsulta();
import { useEffect, useState } from "react"
import { buyCar, retrieveCars, unlistCar } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import toyota from '../images/toyota.jpeg';
import audi from '../images/audi.jpeg';
import ferrari from '../images/ferrari.jpeg';
import lamborghini from '../images/lamborghini.jpeg';

export default function HomeComponent(){


  const authContext = useAuthContext();
  const [cars, setCars] = useState([]);
  
  
  function refreshCars(){
    retrieveCars().then(response => {
      console.log(response.data);
      setCars(response.data);
      console.log(Array.isArray(cars))
    }).catch(error => console.log(error))
  }

  async function buyCarFunction(id){
    await buyCar(id)
    .then(() =>{
      refreshCars();
    })
    .catch(error => console.log('error'))
  }

  useEffect(
    () => {
      refreshCars()
    }, []
  )

    function unlistCarFunction(id){
      unlistCar(id)
      .then(()=>{
        refreshCars();
      })
      .catch(error => console.log(error));
    }

    return(
        <div className="container">
      <table className="car-list">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Type</th>
            <th>Age</th>
            <th>Seller</th>
          </tr>
        </thead>

        <tbody>
          {
            cars.map(
              car => (
              (car.selling == true) ?
                <tr key={car.id}>
                   {
                    (car.brand == 'toyota') ?
                    <td>
                      <img src={toyota} />
                    </td>
                      :
                      ((car.brand == 'audi')) ?

                    <td>
                      <img src={audi} />
                    </td>

                    :

                    ((car.brand == 'lamborghini')) ?

                    <td>
                      <img src={lamborghini} />
                    </td>

                    :

                    <td>
                      <img src={ferrari} />
                    </td>

                    }

                    <td>{car.id}</td>
                    <td>{car.brand}</td>
                    <td>{car.color}</td>
                    <td>{car.type}</td>
                    <td>{car.age}</td>
                    <td>{car.seller}</td>

                    {(car.seller == authContext.user) ? 
                      <td> <button className="btn car-unlist-btn" onClick={() => unlistCarFunction(car.id)}>Unlist</button> </td>
                      : 
                        <td> <button className="btn car-buy-btn" onClick={() => buyCarFunction(car.id)} >Buy</button> </td>                 
                    }
   
                </tr>
                  : <p></p>
              )
            )
          }
        </tbody>
      </table>
      
    </div>
    )
}
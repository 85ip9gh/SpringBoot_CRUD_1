import { useEffect, useState } from "react"
import { retrieveCars } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import toyota from '../images/toyota.jpeg';
import audi from '../images/audi.jpeg';
import ferrari from '../images/ferrari.jpeg';
import lamborghini from '../images/lamborghini.jpeg';

export default function HomeComponent(){


  const authContext = useAuthContext();
    const [cars, setCars] = useState([]);

   
    useEffect(
      () => {
        refreshCars()
      }, []
    )

    function refreshCars(){
      retrieveCars().then(response => {
        console.log(response.data);
        setCars(response.data);
        console.log(Array.isArray(cars))
      }).catch(error => console.log(error))
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
                <tr key={car.id}>
                  {(car.brand == 'toyota') ?
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
                    <td> <button className="btn car-unlist-btn">Unlist</button> </td>
                    : 
                      <td> <button className="btn car-buy-btn">Buy</button> </td>                 
                  }
                  
                </tr>
              )
            )
          }
        </tbody>
      </table>
      
    </div>
    )
}
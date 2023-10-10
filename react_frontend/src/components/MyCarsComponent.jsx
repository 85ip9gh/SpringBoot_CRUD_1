import { useEffect, useState } from "react";
import { retrieveMyCars } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";

export default function MyCarsComponent(){
    const authContext = useAuthContext();
    const [cars, setCars] = useState([]);

   
    useEffect(
      () => {
        refreshCars()
      }, []
    )

    function refreshCars(){
      retrieveMyCars().then(response => {
        console.log(response.data);
        setCars(response.data);
        console.log(Array.isArray(cars))
      }).catch(error => console.log(error))
    }

    function updateCar(){

    }
   
    return(
        <div className="container">
      <table className="carList">
        <thead>
          <tr>
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
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.color}</td>
                  <td>{car.type}</td>
                  <td>{car.age}</td>
                  <td>{car.seller}</td>
                <td><button className="car-update-btn">List for Sale</button></td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
      
    </div>
    )
}
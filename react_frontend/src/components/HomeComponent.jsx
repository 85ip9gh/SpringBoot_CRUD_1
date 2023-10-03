import { useEffect, useState } from "react"
import { retrieveCars } from "../api/CarSaleApiService";

export default function HomeComponent(){

    const [cars, setCars] = useState([]);

   
    useEffect(
    () => refreshCars(), []
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
      <table className="carList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Type</th>
            <th>Age</th>
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
                  <td> <button>Check Out</button> </td>
                  <td> <button>Update</button> </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
      
    </div>
    )
}
import { useEffect, useState } from "react";
import { listCarForSale, removeCar, retrieveMyCars, sellCar } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import { useNavigate } from "react-router-dom";
import toyota from '../images/toyota.jpeg';
import audi from '../images/audi.jpeg';
import ferrari from '../images/ferrari.jpeg';
import lamborghini from '../images/lamborghini.jpeg';

export default function MyCarsComponent(){
    const authContext = useAuthContext();
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

   
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

    async function sellCarFunction(carID){
      await sellCar(carID)
      .then(()=>{
        refreshCars();
      })
      .catch(console.log('error'))
    }

    function updateCarFunction(carID, brand, color, type, age){
      authContext.setCarID(carID);
      authContext.setBrand(brand);
      authContext.setColor(color);
      authContext.setType(type);
      authContext.setAge(age);
      navigate("/update-car")
    }

    function removeCarFunction(carID){
      removeCar(carID).then(()=>{
        refreshCars();
      })
      .catch(error => console.log(error));
    }
   
    return(
        <div className="container">
          <div>
            {
              cars.map(
                car => (
                  (car.selling == false) ?
                    <div key={car.id} className="card">
                       {
                        (car.brand == 'toyota') ?
                        <div>
                          <img src={toyota} />
                        </div>
                          :
                          ((car.brand == 'audi')) ?
    
                        <div>
                          <img src={audi} />
                        </div>
    
                        :
    
                        ((car.brand == 'lamborghini')) ?
    
                        <div>
                          <img src={lamborghini} />
                        </div>
    
                        :
    
                        <div>
                          <img src={ferrari} />
                        </div>
    
                        }
    
                      <div className="inner-card">
                        <div><span><str>ID:</str></span> {car.id}</div>
                        <div>Brand: {car.brand}</div>
                        <div>Color: {car.color}</div>
                        <div>Type: {car.type}</div>
                        <div>Age: {car.age}</div>
                        <div>Seller: {car.seller}</div>
                      </div>
                        
                      <div className="my-cars-btns">
                        <button className="btn" onClick={() => sellCarFunction(car.id)}>List for Sale</button>
                        <button className="btn" onClick={() => updateCarFunction(car.id, car.brand, car.color,car.type, car.age)}>Update Car</button>
                        <button className="btn" onClick={() => removeCarFunction(car.id)}>Remove Car</button></div>
                      
       
                      </div>
                      : <></>
                  )
              )
            }
          </div>
      
    </div>
    )
}
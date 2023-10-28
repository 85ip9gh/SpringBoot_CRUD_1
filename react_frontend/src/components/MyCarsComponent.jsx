import { useEffect, useState } from "react";
import { removeCar, retrieveMyCars, sellCar } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import { useNavigate } from "react-router-dom";
import toyota from '../images/toyota.jpeg';
import audi from '../images/audi.jpeg';
import ferrari from '../images/ferrari.jpeg';
import lamborghini from '../images/lamborghini.jpeg';

export default function MyCarsComponent(){
    const authContext = useAuthContext();
    const [cars, setCars] = useState([]);
    const [numberOfCars, setNumberOfCars] = useState(0);
    const navigate = useNavigate();

   
    useEffect(
      () => {
        refreshCars()
      }, []
    )

    function refreshCars(){
      retrieveMyCars().then(response => {
        console.log(response.data);
        
        const mycars = [];

        response.data.map(
          car => (
            (car.selling === false) ?
              mycars.push(car)
            :null     
          ));
          setCars(mycars);
          setNumberOfCars(mycars.length);
          console.log(Array.isArray(cars));
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
          <div className="grid-container">
            {
              cars.map(
                  car => (
                  (car.selling === false) ?
                    <div key={car.id} className="card">
                       {
                        (car.brand === 'Toyota') ?
                        <div>
                          <img src={toyota} alt="Grey Toyota Sedan" />
                        </div>
                          :
                          ((car.brand === 'Audi')) ?
    
                        <div>
                          <img src={audi} alt="Black Audi SUV"/>
                        </div>
    
                        :
    
                        ((car.brand === 'Lamborghini')) ?
    
                        <div>
                          <img src={lamborghini} alt="Orange Lamborghini Supercar"/>
                        </div>
    
                        :
    
                        <div>
                          <img src={ferrari} alt="Red Ferrari Sportscar" />
                        </div>
    
                        }
    
                    <div className="inner-card">
                      <div><strong>ID:</strong> {car.id}</div>
                      <div><strong>Brand:</strong>  {car.brand}</div>
                      <div><strong>Color:</strong> {car.color}</div>
                      <div><strong>Type:</strong> {car.type}</div>
                      <div><strong>Age:</strong> {car.age}</div>
                      <div><strong>Seller:</strong> {car.seller}</div>
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
            {(numberOfCars==0) ? 
            <h1 className="my-cars-error">
              You Have No Cars!
            </h1>
          :<></>}
      
    </div>
    )
}
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
      <div className="car-list">
          {
            cars.map(
              car => (
              (car.selling == true) ?
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
                    

                    {(car.seller == authContext.user) ? 
                      <div> <button className="btn car-unlist-btn" onClick={() => unlistCarFunction(car.id)}>Unlist</button> </div>
                      : 
                        <div> <button className="btn car-buy-btn" onClick={() => buyCarFunction(car.id)} >Buy</button> </div>                 
                    }
   
                </div>
                  : <></>
              )
            ) 
          }
      </div>
      
    </div>
    )
}
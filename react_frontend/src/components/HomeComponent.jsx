import { useEffect, useState } from "react"
import { buyCar, retrieveCars, unlistCar } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import toyota from '../images/toyota.jpg';
import audi from '../images/audi_new.jpg';
import ferrari from '../images/ferrari.jpg';
import lamborghini from '../images/lamborghini.jpg';

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
      <div className="home-container-inner">
        <p className="container-title">
          Market
        </p>

      </div>
      <div className="grid-container">
          {
            cars.map(
              car => (
              (car.selling === true) ?
                <div key={car.id} className="card">
                   {
                    (car.brand === 'Toyota') ?
                    <div className="img-box">
                      <img src={toyota} alt="Grey Toyota Sedan" />
                    </div>
                      :
                      ((car.brand === 'Audi')) ?

                    <div className="img-box">
                      <img src={audi} alt="Black Audi SUV"/>
                    </div>

                    :

                    ((car.brand === 'Lamborghini')) ?

                    <div className="img-box">
                      <img src={lamborghini} alt="Orange Lamborghini Supercar" />
                    </div>

                    :

                    <div className="img-box">
                      <img src={ferrari} alt="Red Ferrari Sportscar" style={{ }} />
                    </div>

                    }

                  <div className="inner-card">
                    <div><strong>ID:</strong> {car.id}</div>
                    <div><strong>Brand:</strong>  {car.brand}</div>
                    <div className="color-row"><strong>Color:</strong><div className="car-color" style={{backgroundColor: car.color}} ></div></div>
                    <div><strong>Type:</strong> {car.type}</div>
                    <div><strong>Age:</strong> {car.age}</div>
                    <div><strong>Seller:</strong> {car.seller}</div>
                  </div>
                    

                    {(car.seller.toLowerCase() == authContext.user.toLowerCase()) ? 
                      <div> <button className="btn btn-home car-unlist-btn " onClick={() => unlistCarFunction(car.id)}>Unlist</button> </div>
                      : 
                        <div> <button className="btn btn-home car-buy-btn" onClick={() => buyCarFunction(car.id)} >Buy</button> </div>                 
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
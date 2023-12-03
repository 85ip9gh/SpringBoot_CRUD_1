import { useEffect, useState } from "react";
import { addMoneyToUser, removeCar, retrieveMoney, retrieveMyCars, sellCar } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import { useNavigate } from "react-router-dom";
import toyota from '../images/toyota.jpg';
import audi from '../images/audi_new.jpg';
import ferrari from '../images/ferrari.jpg';
import lamborghini from '../images/lamborghini.jpg';
import chevrolet from '../images/chevrolet.jpg';
import honda from '../images/honda.jpg';
import mitsubishi from '../images/mitsubishi.jpg';
import BMW from '../images/BMW.jpg';

export default function MyCarsComponent() {
  const authContext = useAuthContext();
  const [cars, setCars] = useState([]);
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [money, setMoney] = useState(0);
  const [deposit, setDeposit] = useState();
  const navigate = useNavigate();



  useEffect(
    () => {
      refreshCars();
      refreshMoney();
    }, []
  )

  function refreshMoney() {
    retrieveMoney(authContext.user).then(response => {
      console.log(response.data);
      setMoney(response.data);
    }
    ).catch(error => console.log(error))
  }

  function refreshCars() {
    retrieveMyCars().then(response => {
      console.log(response.data);

      const mycars = [];

      response.data.map(
        car => (
          (car.selling === false) ?
            mycars.push(car)
            : null
        ));
      setCars(mycars);
      setNumberOfCars(mycars.length);
      console.log(Array.isArray(cars));
    }).catch(error => console.log(error))
  }

  async function sellCarFunction(carID) {
    await sellCar(carID)
      .then(() => {
        refreshCars();
      })
      .catch(console.log('error'))
  }

  function updateCarFunction(carID, brand, color, type, age, price) {
    authContext.setCarID(carID);
    authContext.setBrand(brand);
    authContext.setColor(color);
    authContext.setType(type);
    authContext.setAge(age);
    authContext.setPrice(price);
    navigate("/update-car")
  }

  function removeCarFunction(carID) {
    removeCar(carID).then(() => {
      refreshCars();
    })
      .catch(error => console.log(error));
  }

  function handleDepositChange(event) {
    setDeposit(event.target.value);
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      await addMoneyToUser(deposit);

      refreshCars();
      refreshMoney();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="market-money">
        <h1>Current Balance: ${money.toLocaleString()}</h1>
        <form className="market-money-make-deposit" onSubmit={submit}>
          <input className="input-text input-number market-input-number" name="deposit" type="number" value={deposit} onChange={handleDepositChange} min={0} required></input>
          <button className="btn my-cars-btn" type="submit">Make Deposit</button>
        </form>
      </div>
      <div className="my-cars-container">


        {(numberOfCars != 0) ?
          <div className="container-home-title">
            <p className="container-title">{authContext.user}'s cars</p>
            <hr />
          </div>
          : <></>
        }

        <div className="grid-container">
          {
            cars.map(
              car => (
                (car.selling === false) ?
                  <div key={car.id} className="card">
                    <div className="img-box">
                      {
                        (car.brand === 'Toyota') ?
                          <img src={toyota} alt="Grey Toyota Sedan" />
                          :
                          ((car.brand === 'Audi')) ?
                            <img src={audi} alt="Black Audi SUV" />
                            :
                            ((car.brand === 'Lamborghini')) ?
                              <img src={lamborghini} alt="Orange Lamborghini Supercar" />
                              :
                              (car.brand == "Honda") ?
                                <img src={honda} alt="Honda Car" />
                                :
                                (car.brand == "Mitsubishi") ?
                                  <img src={mitsubishi} alt="Mitsubishi Car" />
                                  :
                                  (car.brand == "BMW") ?
                                    <img src={BMW} alt="BMW Car" />
                                    :
                                    (car.brand == "Chevrolet") ?
                                      <img src={chevrolet} alt="Chevrolet Car" />
                                      :
                                      <img src={ferrari} alt="Red Ferrari Sportscar" />
                      }
                    </div>

                    <div className="card-flex">


                      <div className="inner-card">
                        <div><strong>ID:</strong> {car.id}</div>
                        <div><strong>Brand:</strong>  {car.brand}</div>
                        <div className="color-row"><strong>Color:</strong> <div className="car-color" style={{ backgroundColor: car.color }} ></div></div>
                        <div><strong>Type:</strong> {car.type}</div>
                        <div><strong>Age:</strong> {car.age}</div>
                        <div><strong>Seller:</strong> {car.seller}</div>
                      </div>

                      <div className="my-cars-inner-card-right">
                        <div className="price-wrapper">
                          <p className="my-cars-price">${car.price.toLocaleString()}</p>
                        </div>
                        <div className="my-cars-btn-wrapper">
                          <button className="btn my-cars-btn my-cars-btn-remove-list-for-sale" onClick={() => sellCarFunction(car.id)}>List for Sale</button>
                          <button className="btn my-cars-btn" onClick={() => updateCarFunction(car.id, car.brand, car.color, car.type, car.age, car.price)}>Update Car</button>
                          <button className="btn my-cars-btn my-cars-btn-remove" onClick={() => removeCarFunction(car.id)}>Remove Car</button></div>
                      </div>
                    </div>
                  </div>

                  : <></>
              )
            )
          }
        </div>
        {(numberOfCars == 0) ?
          <h1 className="my-cars-error">
            You Have No Cars!
          </h1>
          : <></>}
      </div>
    </div>
  )
}
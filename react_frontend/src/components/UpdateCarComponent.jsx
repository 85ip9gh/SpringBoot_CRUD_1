import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";
import { updateCar } from "../api/CarSaleApiService";


export default function UpdateCarComponent(){

  const authContext = useAuthContext();
  const navigate = useNavigate();

  //brand, color, type, age

  const [brand, setBrand] = useState(authContext.brand);
  const [color, setColor] = useState(authContext.color);
  const [type, setType] = useState(authContext.type);
  const [age, setAge] = useState(authContext.age);
  const carID = authContext.carID;

  function handleBrandChange(event){
    setBrand(event.target.value)
  }

  function handleColorChange(event){
    setColor(event.target.value);
  }

  function handleTypeChange(event){
    setType(event.target.value)
  }

  function handleAgeChange(event){
    setAge(event.target.value);
  }

  const submit = async (e) => {
    e.preventDefault();
     await updateCar(carID, brand, color, type, age)
     .then(() => {
      navigate("/my-cars")
     })
     .catch(error => console.log(error));
    
  }


  return(

    <div className="container" >
      <form method="PUT" onSubmit={submit}>
          <p className="form-title">
            Update Car
          </p>
        <div className="form-row">
          <label name="brand" className="update-label" >Brand: </label>
          <select name="brand" value={brand} onChange={handleBrandChange} required>
            <option value="Toyota">Toyota</option>
            <option value="Audi">Audi</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Lamborghini">Lamborghini</option>
          </select>
        </div>

        <div className="form-row">
          <label name="color" className="update-label">Color: </label>
          <input name="color" type="color" value={color} onChange={handleColorChange} className="input-color" required></input>
        </div>

        <div className="form-row">
            <label name="type" className="update-label">Type: </label>
            <select name="type" value={type} onChange={handleTypeChange} required>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Van">Van</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Station Wagon">Station Wagon</option>
            </select>
        </div>

        <div className="form-row">
            <label name="age" className="update-label">Age: </label>
            <input name="age" type="number" className="input-text input-number" min={0} value={age} onChange={handleAgeChange} required></input>
        </div>

        <button type="submit" className="btn" >Update</button>
      </form>
    </div>

  )
}
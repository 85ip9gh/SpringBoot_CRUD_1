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

   async function submit(){
     await updateCar(carID, brand, color, type, age)
     .then(() => {
      navigate("/my-cars")
     })
     .catch(error => console.log(error));
    
  }


  return(

    <div className="container" >
      <form>

        <div>
          <label name="brand" >Brand: </label>
          <select name="brand" value={brand} onChange={handleBrandChange}>
            <option value="Toyota">Toyota</option>
            <option value="Audi">Audi</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Lamborghini">Lamborghini</option>
          </select>
        </div>

        <div>
          <label name="color">Color: </label>
          <input name="color" type="color" value={color} onChange={handleColorChange} ></input>
        </div>

        <div>
            <label name="type">Type: </label>
            <select name="type" value={type} onChange={handleTypeChange} >
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

        <div>
            <label name="age">Age: </label>
            <input name="age" type="number" min={0} value={age} onChange={handleAgeChange}></input>
        </div>

        <button type="button" onClick={submit} >Submit</button>
      </form>
    </div>

  )
}
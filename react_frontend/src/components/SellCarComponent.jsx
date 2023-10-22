import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";
import { listCarForSale } from "../api/CarSaleApiService";


export default function SellCarComponent(){

  const navigate = useNavigate();

  //brand, color, type, age

  const [brand, setBrand] = useState("Toyota");
  const [color, setColor] = useState("#000000");
  const [type, setType] = useState("SUV");
  const [age, setAge] = useState("1");

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
     await listCarForSale(brand, color, type, age)
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
            <option value="toyota">Toyota</option>
            <option value="audi">Audi</option>
            <option value="ferrari">Ferrari</option>
            <option value="lamborghini">Lamborghini</option>
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
            <input name="age" type="number" value={age} onChange={handleAgeChange}></input>
        </div>

        <button type="button" onClick={submit} >Submit</button>
      </form>
    </div>

  )
}
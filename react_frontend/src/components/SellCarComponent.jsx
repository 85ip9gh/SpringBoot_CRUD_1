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
  const [age, setAge] = useState();

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
     await listCarForSale(brand, color, type, age)
     .then(() => {
      navigate("/my-cars")
     })
     .catch(error => console.log(error));
    
  }


  return(

    <div className="container" >
      <form method="POST" onSubmit={submit}>
        <div className="form-row">
          {/* <label name="brand" className="label-add-car">Brand: </label> */}
          <select name="brand" value={brand} onChange={handleBrandChange}>
            <option value="Toyota">Toyota</option>
            <option value="Audi">Audi</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Lamborghini">Lamborghini</option>
          </select>
        </div>

        <div className="form-row">
          {/* <label name="color" className="label-add-car">Color: </label> */}
          <input name="color" type="color" value={color} className="input-color" onChange={handleColorChange} ></input>
        </div>

        <div className="form-row">
            {/* <label name="type" className="label-add-car">Type: </label> */}
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

        <div className="form-row">
            {/* <label name="age" className="label-add-car">Age: </label> */}
            <input name="age" type="number" placeholder="Age of Car in Years" value={age} min={0} onChange={handleAgeChange} className="input-text input-number"></input>
        </div>

        <button type="submit" className="btn" >Add Car</button>
      </form>
    </div>

  )
}
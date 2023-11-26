import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";
import { updateCar } from "../api/CarSaleApiService";


export default function UpdateCarComponent(){

  const authContext = useAuthContext();
  const navigate = useNavigate();

  //brand, color, type, age

  const [form, setForm] = useState({
    brand: authContext.brand,
    color: authContext.color,
    type: authContext.type,
    age: authContext.age,
  });

  const carID = authContext.carID;

  function handleFormChange(event){
    setForm({
      ...form,
      [event.target.name]:event.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault();
     await updateCar(carID, form.brand, form.color, form.type, form.age)
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
          <select name="brand" value={form.brand} onChange={handleFormChange} required>
            <option value="Toyota">Toyota</option>
            <option value="Audi">Audi</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Honda">Honda</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="BMW">BMW</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </div>

        <div className="form-row">
          <label name="color" className="update-label">Color: </label>
          <input name="color" type="color" value={form.color} onChange={handleFormChange} className="input-color" required></input>
        </div>

        <div className="form-row">
            <label name="type" className="update-label">Type: </label>
            <select name="type" value={form.type} onChange={handleFormChange} required>
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
            <input name="age" type="number" className="input-text input-number" min={0} value={form.age} onChange={handleFormChange} required></input>
        </div>

        <button type="submit" className="btn" >Update</button>
      </form>
    </div>

  )
}
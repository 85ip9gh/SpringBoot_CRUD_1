import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";
import { listCarForSale } from "../api/CarSaleApiService";


export default function SellCarComponent(){

  const navigate = useNavigate();

  //brand, color, type, age

  const [form, setForm] = useState({
    brand: "Toyota",
    color: "#000000",
    type: "SUV",
    age: 0,
  });

  function handleFormChange(event){
    setForm({
      ...form,
      [event.target.name]:event.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault();
     await listCarForSale(form.brand, form.color, form.type, form.age)
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
          <select name="brand" value={form.brand} onChange={handleFormChange}>
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
          {/* <label name="color" className="label-add-car">Color: </label> */}
          <input name="color" type="color" value={form.color} className="input-color" onChange={handleFormChange} ></input>
        </div>

        <div className="form-row">
            {/* <label name="type" className="label-add-car">Type: </label> */}
            <select name="type" value={form.type} onChange={handleFormChange} >
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
            <input name="age" type="number" placeholder="Age of Car in Years" value={form.age} min={0} onChange={handleFormChange} className="input-text input-number"></input>
        </div>

        <button type="submit" className="btn" >Add Car</button>
      </form>
    </div>

  )
}
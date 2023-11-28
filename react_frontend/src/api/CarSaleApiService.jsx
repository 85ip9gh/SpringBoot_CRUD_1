import { apiClient } from "./ApiBaseURL";

// const basicToken = 'Basic ' + window.btoa('sam:man');

export const basicAuthentication = (token) => apiClient.get('/basic-auth',{
  headers:{
    Authorization: token
  } 
});

export const JWTAuthencation = (token) =>apiClient.get('/jwt-token',{
  headers:{
    Authorization: token
  }
})

export const logout = () => apiClient.get('/logout');

export const retrieveCars = () => apiClient.get('/cars');

export const retrieveAllUsers = () => apiClient.get('/users');

export const createUser = (name, password) => apiClient.post('/addUser',{
  "name": `${name}`,
    "password": `${password}`,
});

export const retrieveMoney = (name) => apiClient.get(`/users/${name}/money`);

export const updateCar = (id, brand, color, type, age, price) => apiClient.put(`/updateCar`,{
    "id": `${id}`,
    "brand": `${brand}`,
    "color": `${color}`,
    "type": `${type}`,
    "age": `${age}`,
    "price": `${price}`
});

export const buyCar = (id) => apiClient.put(`/cars/${id}/buy`)

export const sellCar = (id) => apiClient.put(`/cars/${id}/selling`)

export const unlistCar = (id) => apiClient.put(`/cars/${id}/unlist`)

export const retrieveMyCars = () => apiClient.get(`/users/cars`);

export const removeCar = (carID) => apiClient.delete(`/deleteCar/${carID}`);

export const searchCarByBrand = (carBrand) => apiClient.get(`/cars/${carBrand}`);

export const listCarForSale = (brand, color, type, age, price) => apiClient.post('/addCar',{
    "brand": `${brand}`,
    "color": `${color}`,
    "type": `${type}`,
    "age": `${age}`,
    "price": `${price}`
  }
);

export const createNewUser = (newUserName, newPassword) => apiClient.post('/createUser',{
  "name": `${newUserName}`
  }, `${newPassword}`
);
import { apiClient } from "./ApiBaseURL";

// const basicToken = 'Basic ' + window.btoa('sam:man');

export const basicAuthentication = (token) => apiClient.get('/basic-auth',{
  headers:{
    Authorization: token
  } 
});

export const retrieveCars = () => apiClient.get('/cars');

export const createUser = (name, password) => apiClient.post('/addUser',{
  "name": `${name}`,
    "password": `${password}`,
});

export const updateCar = () => apiClient.put();

export const buyCar = (id) => apiClient.put(`/cars/${id}/buy`)

export const sellCar = (id) => apiClient.put(`/cars/${id}/selling`)

export const unlistCar = (id) => apiClient.put(`/cars/${id}/unlist`)

export const retrieveMyCars = () => apiClient.get(`/users/cars`);

export const removeCar = (carId) => apiClient.delete(`/deleteCar/${carId}`);

export const searchCarByBrand = (carBrand) => apiClient.get(`/cars/${carBrand}`);

export const listCarForSale = (brand, color, type, age) => apiClient.post('/addCar',{
    "brand": `${brand}`,
    "color": `${color}`,
    "type": `${type}`,
    "age": `${age}`
  }
);

// apiClient.interceptors.request.use(
//   (config) => {
//       console.log('intercepting');
//       config.headers.Authorization = basicToken;
//       return config;
//     }
    
//   )

export const createNewUser = (newUserName, newPassword) => apiClient.post('/createUser',{
  "name": `${newUserName}`
  }, `${newPassword}`
);

// export const retrieveLogin = () => apiClient.get("/login",{
//   headers:{
//     Authorization: 'Basic c2FtOm1hbg=='
//   }
// })
import { apiClient } from "./ApiBaseURL";

const basicToken = 'Basic ' + window.btoa('sam:man');

export const retrieveCars = () => apiClient.get('/cars');

export const retrieveMyCars = (username) => apiClient.get(`/cars/${username}`);

export const removeCar = (carId) => apiClient.delete(`/deleteCar/${carId}`);

export const searchCarByBrand = (carBrand) => apiClient.get(`/cars/${carBrand}`);

export const listCarForSale = (brand, color, type, age) => apiClient.post('/addCar',{
    "brand": `${brand}`,
    "color": `${color}`,
    "type": `${type}`,
    "age": `${age}`
  }
);

apiClient.interceptors.request.use(
  (config) => {
      console.log('intercepting');
      config.headers.Authorization = basicToken;
      return config;
    }
    
  )

export const createNewUser = (newUserName, newPassword) => apiClient.post('/createUser',{
  "name": `${newUserName}`
  }, `${newPassword}`
);

// export const retrieveLogin = () => apiClient.get("/login",{
//   headers:{
//     Authorization: 'Basic c2FtOm1hbg=='
//   }
// })
import axios from "axios";

export const apiClient = axios.create(
  {
  //for local machine
  //baseURL: 'http://localhost:8080'

  //for GCP vm instance
  //baseURL: 'http://34.148.248.82:8080'

  //for Azure vm instance
  baseURL: 'http://40.76.224.112:8080'
  }
)
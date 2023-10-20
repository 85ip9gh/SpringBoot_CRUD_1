import axios from "axios";

export const apiClient = axios.create(
  {
  //v8
  baseURL: 'http://localhost:8080'

  //v9
  //baseURL: 'http://34.148.248.82:8080'
  }
)
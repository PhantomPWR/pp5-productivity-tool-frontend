// Axios library
import axios from "axios";

// URL for API requests
axios.defaults.baseURL = 'https://pp5-productivity-tool.herokuapp.com/'

// Set up default headers
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

// Set up default withCredentials
axios.defaults.withCredentials = true

// Set up interceptors to add CSRF token to requests
export const axiosReq = axios.create();
export const axiosRes = axios.create();
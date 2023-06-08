import axios from "axios";

axios.defaults.baseURL = 'https://pp5-productivity-tool-frontend.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
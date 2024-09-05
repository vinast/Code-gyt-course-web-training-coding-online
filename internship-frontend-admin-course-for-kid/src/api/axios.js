import axios from "axios";
const instance = axios.create({
    // baseURL:'https://pure-tundra-56047.herokuapp.com',
    baseURL:'http://localhost:5000',
    withCredentials: true
});

export default instance;
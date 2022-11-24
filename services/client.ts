import axios from "axios";

export default axios.create({
    // TODO: move to env
    baseURL: "http://localhost:8080",
    timeout: 5000,
    withCredentials: false // have to stay false for CORS reasons
});




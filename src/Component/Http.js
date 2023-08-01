import axios from "axios";

export const Http = axios.create({
    baseURL:'http://192.168.43.73:1000'
})
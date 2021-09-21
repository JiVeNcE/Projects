import axios, { AxiosInstance } from 'axios';
import cachios from 'cachios';

const axiosInstance: AxiosInstance = axios.create();

export const cachiosInstance = cachios.create(axiosInstance);

export default axiosInstance;

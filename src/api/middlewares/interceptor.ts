import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import CONFIG_KEYS from '../../config';
import CustomApiError from '../../utils/CustomApiError.ts';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG_KEYS.API_BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { data, status } = error.response;
            if (status === 400) {
                throw new CustomApiError('Bad Request', data);
            } else if (status === 401) {
                throw new CustomApiError('Unauthorized', data);
            }
        }
    },
);

import CONFIG_KEYS from '../../config';
import axiosInstance from '../middlewares/interceptor';
import { ContactInfo } from '../types/student/student';

export const submitResponseService = async (endpoint: string, info: ContactInfo) => {
    const response = await axiosInstance.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, info);
    return response.data;
};

import { submitResponseService } from '../services/contact';
import END_POINTS from '../../constants/endpoints';
import { ContactInfo } from '../types/student/student';

export const submitResponse = (info: ContactInfo) => {
    return submitResponseService(END_POINTS.CONTACT_US, info);
};

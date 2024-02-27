import END_POINTS from '../../../constants/endpoints';

import { getTrendingCoursesService, getRecommendedCoursesService } from '../../services/course/course-service';
// import { PaymentIntent } from '@stripe/stripe-js';

export const getTrendingCourses = () => {
    return getTrendingCoursesService(END_POINTS.GET_TRENDING_COURSES);
};

export const getRecommendedCourses = () => {
    return getRecommendedCoursesService(END_POINTS.GET_TRENDING_COURSES);
};

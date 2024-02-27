import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserType } from '../../../redux/reducers/authSlice';
import { Typography } from '@material-tailwind/react';
import {
    ApiResponseRecommended,
    ApiResponseTrending,
} from '../../../api/types/apiResponses/api-response-home-page-listing';
import Carousel from '../../elements/carousel-page';
import TrendingCard from '../home/trending-card';
import TrendingCardShimmer from '../../shimmer/shimmer-trending-course';
import { getTrendingCourses, getRecommendedCourses } from '../../../api/endpoints/course/course';
import { Link } from 'react-router-dom';

const StudentHomePage: React.FC = () => {
    const [trendingCourses, setTrendingCourses] = useState<ApiResponseTrending[] | null>(null);

    const [recommendedCourses, setRecommendedCourses] = useState<ApiResponseRecommended[] | null>(null);

    const [showMoreTrending, setShowMoreTrending] = useState(false);
    const [showMoreRecommended, setShowMoreRecommended] = useState(false);

    const [cardsToShow, setCardsToShow] = useState(6);

    const [isLoadingTrending, setIsLoadingTrending] = useState(false);
    const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUserType);

    const fetchTrendingCourses = async () => {
        try {
            setIsLoadingTrending(true);
            const response = await getTrendingCourses();
            setTrendingCourses(response.data);
            setTimeout(() => {
                setIsLoadingTrending(false);
            }, 1000);
        } catch (error) {
            setIsLoadingTrending(false);
        }
    };

    const fetchRecommendedCourses = async () => {
        try {
            setIsLoadingRecommended(true);
            const response = await getRecommendedCourses();
            setRecommendedCourses(response.data);
            setTimeout(() => {
                setIsLoadingRecommended(false);
            }, 1000);
        } catch (error) {
            setIsLoadingRecommended(false);
        }
    };

    useEffect(() => {
        fetchTrendingCourses();
        isLoggedIn && user === 'student';
    });

    const handleShowMoreTrending = () => {
        setShowMoreTrending(true);
        setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
    };

    if (isLoadingTrending || isLoadingRecommended) {
        return (
            <div>
                <Carousel />
                <div className="lg:p-10 md:p-7 pt-7 sm:p-8 w-full">
                    <div className="ml-10 flex items-center justify-start w-9/12">
                        <Typography
                            variant="h1"
                            className="text-2xl lg:text-4xl p-2 ml-2 font-semibold"
                            placeholder={undefined}
                        >
                            Trending Courses
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between px-10 flex-wrap">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TrendingCardShimmer key={index} />
                        ))}
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="lg:p-10 md:p-7 pt-5 sm:p-8 w-full">
                        <div className="ml-10 flex items-center justify-start w-9/12">
                            <Typography
                                variant="h1"
                                className="text-2xl p-2 ml-2 lg:text-4xl font-semibold"
                                placeholder={undefined}
                            >
                                Recommended Courses
                            </Typography>
                        </div>
                        <div className="flex items-center justify-between pt-2 px-10 flex-wrap">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TrendingCardShimmer key={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div>
                <Carousel />
            </div>
            <div className="lg:p-10 md:p-7 pt-7 sm:p-8 w-full">
                <div className="ml-10 flex items-center justify-start w-9/12">
                    <Typography
                        variant="h1"
                        className="text-2xl p-2 ml-2 lg:text-4xl font-semibold"
                        placeholder={undefined}
                    >
                        Trending Courses
                    </Typography>
                </div>
                <div className="flex items-center justify-between px-10 flex-wrap">
                    {trendingCourses?.slice(0, cardsToShow).map((course) => {
                        return (
                            <div className="grid md:m-5 my-6 justify-center overflow-hidden text-center bg-red-200 rounded-lg">
                                <Link key={course._id} to={`/courses/${course._id}`}>
                                    <TrendingCard courseInfo={course} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
                {trendingCourses && trendingCourses.length > cardsToShow && (
                    <div className="md:flex-shrink-0 mt-3 ml-6">
                        <div className="flex-shrink-0">
                            <button
                                className="text-customFontColorBlack ml-3 hover:text-blue-gray-600 font-bold px-6 rounded"
                                onClick={handleShowMoreTrending}
                            >
                                View More
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentHomePage;

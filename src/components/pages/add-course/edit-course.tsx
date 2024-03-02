import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { addCourseValidationSchema } from '../../../validations/course/addCourse';
import { Switch } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { getIndividualCourse } from '../../../api/endpoints/course/course';
import { useParams } from 'react-router-dom';
import { CourseInterface } from '../../../types/course';
import { ApiResponseCategory } from '../../../api/types/apiResponses/api-response-category';
import { getAllCategories } from '../../../api/endpoints/category';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { AiOutlineClose } from 'react-icons/ai';
import { editCourse } from '../../../api/endpoints/course/course';

pdfjs.GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.js';

interface InitialValType {
    title: string;
    instructor: string;
    about: string;
    duration: string | number;
    description: string;
    requirements: string;
    lessons: string;
    category: string;
    price: string | number;
    tags: string;
    syllabus: string;
    level: string;
    [key: string]: string | number;
}

const initialValues: InitialValType = {
    title: '',
    instructor: '',
    duration: '',
    description: '',
    requirements: '',
    lessons: '',
    category: '',
    price: '',
    tags: '',
    about: '',
    syllabus: '',
    level: '',
};

const levels = ['easy', 'medium', 'hard'];

const EditCourse: React.FC = () => {
    const [paid, setPaid] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [guidelines, setGuidelines] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState<CourseInterface | null>(null);
    const { courseId } = useParams();
    const [categories, setCategories] = useState<ApiResponseCategory[] | null>(null);
    const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
    const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
    const fetchCategory = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const fetchCourse = async (courseId: string) => {
        try {
            setLoading(true);
            const response = await getIndividualCourse(courseId);
            setCourse(response?.data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('something went wrong');
        }
    };

    useEffect(() => {
        if (course) {
            initialValues.title = course.title;
            initialValues.category = course.category;
            initialValues.level = course.level;
            initialValues.description = course.description;
            initialValues.duration = course.duration;
            initialValues.tags = course.tags.join(' ');
            initialValues.price = course.price;
            initialValues.about = course.about;
            initialValues.syllabus = course.syllabus.join('');
            initialValues.requirements = course.requirements.join('');
            setPaid(course.isPaid);
        }
    }, [course]);

    const handleFormSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            guidelines && formData.append('files', guidelines);
            thumbnail && formData.append('files', thumbnail);
            Object.keys(values).forEach((key) => formData.append(key, values[key]));
            const response = await editCourse(courseId ?? '', formData);
            toast.success(response.data.message, {
                position: 'bottom-right',
            });
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if (courseId) {
            fetchCourse(courseId);
        }
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handlePaid = () => {
        setPaid(!paid);
    };

    const toggleThumbnailModal = () => {
        setIsThumbnailModalOpen(!isThumbnailModalOpen);
    };

    const toggleGuidelinesModal = () => {
        setIsGuidelinesModalOpen(!isGuidelinesModalOpen);
    };
};

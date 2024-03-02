import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { ApiResponseCategory } from '../../../api/types/apiResponses/api-response-category';
import { toast } from 'react-toastify';
import { addCourse } from '../../../api/endpoints/course/course';
import { getAllCategories } from '../../../api/endpoints/category';
import { addCourseValidationSchema } from '../../../validations/course/addCourse';

interface CourseFormValues {
    title: string;
    duration: string;
    category: string;
    level: string;
    tags: string;
    about: string;
    description: string;
    syllabus: string;
    requirements: string;
    price: string;
    [key: string]: string;
}

const initialValues = {
    title: '',
    duration: '',
    category: '',
    level: '',
    tags: '',
    about: '',
    description: '',
    syllabus: '',
    requirements: '',
    price: '',
};

const CombinedForm: React.FC = () => {
    const [paid, setPaid] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [guidelines, setGuidelines] = useState<File | null>(null);
    const [introduction, setIntroduction] = useState<File | null>(null);
    const [categories, setCategories] = useState<ApiResponseCategory[] | null>(null);

    const handleFormSubmit = async (values: CourseFormValues, { resetForm }: FormikHelpers<CourseFormValues>) => {
        try {
            const formData = new FormData();
            guidelines && formData.append('files', guidelines);
            thumbnail && formData.append('files', thumbnail);
            introduction && formData.append('files', introduction);
            Object.keys(values).forEach((key) => formData.append(key, values[key]));
            const response = await addCourse(formData);
            toast.success(response.data.message, {
                position: 'bottom-right',
            });
            resetForm();
            setGuidelines(null);
            setThumbnail(null);
            setIntroduction(null);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handlePaid = () => {
        setPaid(!paid);
    };

    return (
        <div className="mb-20">
            <div className="ml-12 pl-20">
                <h1 className="font-bold text-xl text-gray-800">Create Course</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={addCourseValidationSchema}
                onSubmit={handleFormSubmit}
            >
                <Form>
                    <div className="bg-white mlp-32 rounded-lg border-2 border-gray-200 mr-32 mb-24 mt-2 p-5">
                        <div className="flex w-full justify-center mt-10 pt-3 space-x-14">
                            <div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Title
                                    </label>
                                    <Field
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="pl-2 block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

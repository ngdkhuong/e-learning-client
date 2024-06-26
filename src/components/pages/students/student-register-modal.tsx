// components/auth/RegisterModal.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerStudent } from '../../../api/endpoints/auth/student-auth';
import { registerValidationSchema } from '../../../validations/auth/registerValidation';
import { toast } from 'react-toastify';
import { useModal } from '../../../context/modal-context';
import { APP_LOGO } from './../../../constants/common';

const RegisterModal: React.FC = () => {
    const { closeModal, openModal } = useModal();

    const handleSubmit = async (studentInfo: any) => {
        try {
            const response = await registerStudent(studentInfo);
            if (response.data.status === 'success') {
                toast.success('Registration successful', { position: 'bottom-right' });
                closeModal();
            }
        } catch (error: any) {
            toast.error(error?.data?.message, { position: 'bottom-right' });
        }
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content flex justify-center items-center mt-16 text-customFontColorBlack">
                <div className="bg-white rounded-lg mx-4 shadow-xl border p-8 w-full max-w-md md:mx-auto md:p-10 lg:p-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-20 w-auto" src={APP_LOGO} alt="KUONDEV ACADEMY" />
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <Formik
                        initialValues={{ fullName: '', email: '', password: '' }}
                        validationSchema={registerValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-10 space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="fullName"
                                        name="fullName"
                                        type="fullName"
                                        autoComplete="fullName"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <button
                            onClick={() => openModal('login')}
                            className="cursor-pointer font-semibold leading-6 text-blue-600 hover:text-indigo-500"
                        >
                            &nbsp; Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;

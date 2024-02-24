const END_POINTS = {
    LOGIN_STUDENT: 'api/auth/student-login',
    REGISTER_STUDENT: 'api/auth/student-register',
    GOOGLE_LOGIN_STUDENT: 'api/auth/login-with-google',
    REGISTER_INSTRUCTOR: 'api/auth/instructor/instructor-register',
    LOGIN_INSTRUCTOR: 'api/auth/instructor/instructor-login',
    LOGIN_ADMIN: 'api/auth/admin/admin-login',
    GET_INSTRUCTOR_REQUESTS: 'api/instructors/view-instructor-requests',
    GET_INSTRUCTOR: 'api/instructors/view-instructor',
    ACCEPT_INSTRUCTOR_REQUESTS: 'api/instructors/accept-instructor-request',
    REJECT_INSTRUCTOR_REQUESTS: 'api/instructors/reject-instructor-request',
    GET_INSTRUCTORS: 'api/instructors/get-all-instructors',
    BLOCK_INSTRUCTORS: 'api/instructors/get-all-instructors/block-instructors',
    UNBLOCK_INSTRUCTORS: 'api/instructors/get-all-instructors/unblock-instructors',
    GET_BLOCKED_INSTRUCTORS: 'api/instructors/get-blocked-instructors',
    ADD_COURSE: 'api/courses/instructors/add-course',
    GET_ALL_COURSES: 'api/courses/get-all-courses',
    GET_COURSE: 'api/courses/get-course',
    REFRESH_TOKEN: 'api/all/refresh-token/refresh',
    GET_COURSES_BY_INSTRUCTORS: 'api/courses/get-course-by-instructor',
    GET_LESSONS_BY_COURSE: 'api/courses/instructors/get-lessons-by-course',
};

export default END_POINTS;

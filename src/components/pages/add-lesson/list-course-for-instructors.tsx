import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon, TrashIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { getCourseByInstructor } from '../../../api/endpoints/course/course';
import { formatDate } from '../../../utils/helpers';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useSearch from '../../../hooks/useSearch';

const TABS = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Monitored',
        value: 'monitored',
    },
    {
        label: 'Pending',
        value: 'pending',
    },
];

const TABLE_HEAD = ['Course', 'Category', 'Status', 'Added', ''];

const ListCourseForInstructors: React.FC = () => {
    // const [courses, setCourses] = useState<
    //   GetCourseByInstructorInterface[] | null
    // >(null);
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { currentPage, totalPages, currentData, goToPreviousPage, goToNextPage } = usePagination(courses, 4);
    const searchResult = useSearch(courses, searchQuery);
    const fetData = async () => {
        const response = await getCourseByInstructor();
        setCourses(response.data);
    };

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    };
    useEffect(() => {
        fetData();
    }, []);
    const displayData = searchQuery !== '' ? searchResult : currentData;

    return (
        <Card className="h-auto w-full mb-24 " placeholder={undefined}>
            <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                            Course list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                            See information about all courses
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" color="blue-gray" size="sm" placeholder={undefined}>
                            view all
                        </Button>
                        <Link to="/instructors/add-course">
                            <Button className="flex items-center gap-3" color="blue" size="sm" placeholder={undefined}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add course
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader placeholder={undefined}>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} placeholder={undefined}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            value={searchQuery}
                            onInput={handleSearch}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            crossOrigin={undefined}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0" placeholder={undefined}>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        placeholder={undefined}
                                    >
                                        {head}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {displayData.length > 0 ? (
                            displayData.map(({ _id, title, thumbnailUrl, category, createdAt, isVerified }, index) => {
                                const isLast = index === currentData.length - 1;
                                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                                if (index <= 4) {
                                    return (
                                        <tr key={_id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={thumbnailUrl}
                                                        alt={'image'}
                                                        size="sm"
                                                        placeholder={undefined}
                                                    />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                            placeholder={undefined}
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                        placeholder={undefined}
                                                    >
                                                        {category}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={isVerified ? 'active' : 'pending'}
                                                        color={isVerified ? 'green' : 'blue-gray'}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                    placeholder={undefined}
                                                >
                                                    {formatDate(createdAt)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Add lessons">
                                                    <Link to={`/instructors/view-lessons/${_id}`}>
                                                        <IconButton
                                                            variant="text"
                                                            color="blue-gray"
                                                            placeholder={undefined}
                                                        >
                                                            <SquaresPlusIcon className="h-4 w-4 text-blue-500" />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip content="Edit course">
                                                    <Link to={`/instructors/edit-course/${_id}`}>
                                                        <IconButton
                                                            variant="text"
                                                            color="blue-gray"
                                                            placeholder={undefined}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip content="Delete course">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue-gray"
                                                        placeholder={undefined}
                                                    >
                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        ) : (
                            <tr>
                                <td className="p-4 text-center" colSpan={TABLE_HEAD.length}>
                                    <div className="flex items-center justify-center gap-2">
                                        <ExclamationCircleIcon className="h-6 w-6 text-blue-gray-400" />
                                        <Typography variant="small" color="blue-gray" placeholder={undefined}>
                                            No results found for your search query.
                                        </Typography>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter
                className="flex items-center justify-between border-t border-blue-gray-50 p-4"
                placeholder={undefined}
            >
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        placeholder={undefined}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        placeholder={undefined}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
export default ListCourseForInstructors;

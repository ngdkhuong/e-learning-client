import { toast } from 'react-toastify';
import usePagination from '../../../hooks/usePagination';
import { getAllInstructors, unblockInstructors } from '../../../api/endpoints/instructor-management';
import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    CardFooter,
    Button,
} from '@material-tailwind/react';
import BlockReasonModal from './block-reason-modal';
import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../../utils/helpers';

const TABLE_HEAD = ['Name', 'Email', 'Data Joined', 'Status', 'Actions', ''];

const ViewInstructors: React.FC = () => {
    const [instructors, setInstructors] = useState([]);
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [id, setId] = useState('');
    const ITEMS_PER_PAGE = 4;
    const { currentPage, totalPages, currentData, goToPage, goToPreviousPage, goToNextPage } = usePagination(
        instructors,
        ITEMS_PER_PAGE,
    );
    const fetchInstructors = async () => {
        try {
            const response = await getAllInstructors();
            setInstructors(response?.data?.data);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, [updated]);

    const handleUnblock = async (instructorId: string) => {
        try {
            const response = await unblockInstructors(instructorId);
            toast.success(response.data.message, {
                position: 'bottom-right',
            });
            setUpdated(!updated);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    return (
        <Card className="h-full w-full" placeholder={undefined}>
            {open && (
                <BlockReasonModal open={open} setOpen={setOpen} updated={updated} setUpdated={setUpdated} id={id} />
            )}
            <CardHeader placeholder={undefined} floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col  justify-between gap-8 md:flex-row md:items-center">
                    <div className="">
                        <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                            Manage Instructors
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                            These are details about the instructors
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-0 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                crossOrigin={undefined}
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0" placeholder={undefined}>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                        placeholder={undefined}
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(
                            (
                                { _id, firstName, lastName, email, dateJoined, isBlocked, isVerified, profileUrl },
                                index,
                            ) => {
                                const isLast = index === instructors.length - 1;
                                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={profileUrl}
                                                    alt="image"
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                    placeholder={undefined}
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                    placeholder={undefined}
                                                >
                                                    {`${firstName} ${lastName}`}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                                placeholder={undefined}
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                                placeholder={undefined}
                                            >
                                                {formatDate(dateJoined)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={
                                                        isBlocked
                                                            ? 'Blocked'
                                                            : isVerified === false
                                                            ? 'Pending'
                                                            : 'Active'
                                                    }
                                                    color={isBlocked ? 'red' : isVerified === false ? 'amber' : 'green'}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center">
                                                {isBlocked ? (
                                                    <div className="">
                                                        <button
                                                            onClick={() => {
                                                                handleUnblock(_id);
                                                            }}
                                                            className="w-[80px] px-1 py-1.5 text-xs bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95"
                                                        >
                                                            Unblock
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="">
                                                        <button
                                                            onClick={() => {
                                                                setOpen(true);
                                                                setId(_id);
                                                            }}
                                                            className="w-[80px] px-1 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out active:scale-95"
                                                        >
                                                            Block
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text" color="blue-gray" placeholder={undefined}>
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter
                className="flex items-center justify-between border-t border-blue-gray-50 p-4"
                placeholder={undefined}
            >
                <Button
                    variant="outlined"
                    color="blue-gray"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    placeholder={undefined}
                >
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <IconButton
                            key={pageNumber}
                            variant={pageNumber === currentPage ? 'outlined' : 'text'}
                            color="blue-gray"
                            size="sm"
                            onClick={() => goToPage(pageNumber)}
                            placeholder={undefined}
                        >
                            {pageNumber}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant="outlined"
                    color="blue-gray"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    placeholder={undefined}
                >
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ViewInstructors;

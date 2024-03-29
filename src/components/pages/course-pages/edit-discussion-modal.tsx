import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { editDiscussions } from '../../../api/endpoints/course/discussion';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Textarea } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    updated: boolean;
    setUpdated: (updated: boolean) => void;
    commentId: string;
    message: string;
}

const EditDiscussionModal: React.FC<Props> = ({ open, setOpen, updated, setUpdated, commentId, message }) => {
    const [comment, setComment] = useState<string>(message);
    const handleEdit = async () => {
        try {
            const response = await editDiscussions(commentId, comment);
            setOpen(!open);
            setUpdated(!updated);
            toast.success(response.message, {
                position: 'bottom-right',
            });
        } catch (error) {
            setComment(message);
            setOpen(!open);
            toast.error('Something went wrong please try again later', {
                position: 'bottom-right',
            });
        }
    };

    const handleOpen = () => setOpen(!open);

    return (
        <React.Fragment>
            <Dialog open={open} placeholder={undefined} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader placeholder={undefined}>Edit comment</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpen} />
                </div>
                <DialogBody divider placeholder={undefined}>
                    <div className="grid gap-6">
                        <Textarea label="Message" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2" placeholder={undefined}>
                    <Button variant="outlined" color="red" onClick={handleOpen} placeholder={undefined}>
                        close
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleEdit} placeholder={undefined}>
                        Edit
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
};

export default EditDiscussionModal;

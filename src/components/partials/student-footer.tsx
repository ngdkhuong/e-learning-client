import { Typography } from '@material-tailwind/react';

const LINKS = [
    {
        title: 'Product',
        items: ['Overview', 'Features', 'Solutions', 'Tutorials'],
    },
    {
        title: 'Company',
        items: ['About us', 'Careers', 'Press', 'News'],
    },
    {
        title: 'Resource',
        items: ['Blog', 'Newsletter', 'Events', 'Help center'],
    },
];

const currentYear = new Date().getFullYear();

export default function StudentFooter() {
    return (
        <footer className="relative w-full mt-20">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <Typography variant="h5" className="mb-6" placeholder={undefined}>
                        E-LEARNING
                    </Typography>
                    <div className="grid grid-cols-3"></div>
                </div>
            </div>
        </footer>
    );
}

import React from 'react';
import {
    Navbar,
    Typography,
    Collapse,
    IconButton,
    MenuItem,
    Card,
    Menu,
    MenuHandler,
    MenuList,
} from '@material-tailwind/react';
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Bars2Icon,
    ChevronDownIcon,
    RocketLaunchIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { ProfileMenu } from './profile-menu-instructor';

// nav list menu
const navListMenuItems = [
    {
        title: '@material-tailwind/html',
        description: 'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
    },
    {
        title: '@material-tailwind/react',
        description: 'Learn how to use @material-tailwind/react, packed with rich components for React.',
    },
    {
        title: 'Material Tailwind PRO',
        description: 'A complete set of UI Elements for building faster websites in less time.',
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const triggers = {
        onMouseEnter: () => setIsMenuOpen(true),
        onMouseLeave: () => setIsMenuOpen(false),
    };

    const renderItems = navListMenuItems.map(({ title, description }) => (
        <a href="#" key={title}>
            <MenuItem placeholder={undefined}>
                <Typography variant="h6" color="blue-gray" className="mb-1" placeholder={undefined}>
                    {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal" placeholder={undefined}>
                    {description}
                </Typography>
            </MenuItem>
        </a>
    ));

    return (
        <React.Fragment>
            <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal" placeholder={undefined}>
                        <MenuItem
                            placeholder={undefined}
                            {...triggers}
                            className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
                        >
                            <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{' '}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList
                    placeholder={undefined}
                    {...triggers}
                    className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
                >
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                        placeholder={undefined}
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">{renderItems}</ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden" placeholder={undefined}>
                <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{' '}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">{renderItems}</ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: 'Account',
        icon: UserCircleIcon,
    },
    {
        label: 'Blocks',
        icon: CubeTransparentIcon,
    },
    {
        label: 'Docs',
        icon: CodeBracketSquareIcon,
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon }) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full" placeholder={undefined}>
                        {React.createElement(icon, { className: 'h-[18px] w-[18px]' })} {label}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export default function InstructorHeader() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false));
    }, []);

    return (
        <Navbar
            className="mx-auto border-b bg-white border-gray-300 max-w-full   lg:pl-6 shadow-none rounded-none"
            placeholder={undefined}
        >
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-2xl"
                    placeholder={undefined}
                >
                    TutorTrek
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                    placeholder={undefined}
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <ProfileMenu />
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}

import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';

export const TrendingCardShimmer: React.FC = () => {
    return (
        <Card
            variant="outlined"
            className="relative md:m-5 grid h-[30rem] sm:h-[28rem] sm:w-[22rem] w-[24rem] my-6 items-end justify-center overflow-hidden text-center"
        >
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-gray-300 animate-pulse"
                children={undefined}
            />
            <CardContent className="relative py-14 px-6 md:px-12">
                <div className="animate-pulse">
                    <Typography variant="h2" color="gray" className="mb-6 font-medium leading-[1.5]">
                        Loading...
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-gray-400">
                        Loading...
                    </Typography>
                    <Avatar alt="Loading" variant="circular" className="border-2 border-white" src="" />
                </div>
            </CardContent>
        </Card>
    );
};

import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';
import { ApiResponseTrending } from './../../../api/types/apiResponses/api-response-home-page-listing';

interface Props {
    courseInfo: ApiResponseTrending;
}

const TrendingCard: React.FC<Props> = ({ courseInfo }) => {
    const imageUrl = courseInfo?.thumbnailUrl;
    const profileUrl = courseInfo.profileUrl;
    return (
        <div>
            <Card
                shadow={false}
                className="relative grid h-[30rem] sm:h-[28rem] sm:w-[22rem] w-[24rem] items-end justify-center overflow-hidden text-center"
                placeholder={undefined}
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                    placeholder={undefined}
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="relative py-14 px-6 md:px-12" placeholder={undefined}>
                    <Typography
                        placeholder={undefined}
                        className="mb-6 text-3xl font-medium leading-[1.5]"
                        color="white"
                        variant="h3"
                    >
                        {courseInfo.title}
                    </Typography>
                    <Typography placeholder={undefined} className="mb-4 text-gray-400" variant="h5">
                        {courseInfo.instructorFirstName + ' ' + courseInfo.instructorLastName}
                    </Typography>
                    <Avatar
                        size="xl"
                        variant="circular"
                        alt="ryan reynold"
                        className="border-2 border-white"
                        src={profileUrl}
                        placeholder={undefined}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default TrendingCard;

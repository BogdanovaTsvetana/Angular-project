export interface INanny {
    _id: string;
    //name: string;
    firstName: string;
    lastName: string;
    description: string;
    workingTime: string;
    drivingLicence: string;
    gender: string;
    phone: string;
    image: string;
    user: object | string;

    postDate: string;
    likes: string[];
    comments: any[];
    __v: string;
}


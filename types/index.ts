export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
    };
}

export interface StoredUser {
    name: string;
    email: string;
    picture: string;
}

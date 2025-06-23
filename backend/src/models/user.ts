export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string; // Image-URL
    password?: string; // hashed
    bio: string;
    location: string;
    link: string;
}
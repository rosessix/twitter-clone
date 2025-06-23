export interface Post {
    id: string,
    author: string, // author id
    text: string,
    likes: number,
    comments: Array<any>,
    created_at: Date
}
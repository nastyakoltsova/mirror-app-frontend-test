export interface IPost {
    caption: string,
    id: string,
    date: Date,
    comments: number,
    likes: number,
    permalink: string,
    userId: string
}

export interface IFormattedPost extends IPost {
    username: string
}
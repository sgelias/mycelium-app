export interface ListResponse<T> {
    count: number,
    records: T,
    indices: {
        [key: string]: {
            name: string,
            options: string[],
        }
    },
}

export interface PaginatedListResponse<T> {
    count: number,
    skip: number,
    size: number,
    records: T,
}

export class PaginateResult{
    data: any[];
    meta: {
        total: number,
        page: number,
        lastPage: number
    }
}
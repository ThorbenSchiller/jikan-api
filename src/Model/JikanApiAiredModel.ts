export interface JikanApiAiredModel {
    from: string | null;
    to: string | null;
    prop: {
        from: {
            day: number | null;
            month: number | null;
            year: number | null;
        },
        to: {
            day: number | null;
            month: number | null;
            year: number | null;
        },
    };
    string: string;
}

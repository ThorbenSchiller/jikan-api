/**
 * Model for airing information.
 */
export interface JikanApiAiredModel {
    /**
     * The airing start date (ISO 8601, UTC).
     *
     * @example 1998-04-03T00:00:00+00:00
     */
    from: string | null;
    /**
     * The airing end date (ISO 8601, UTC).
     *
     * @example 1999-04-24T00:00:00+00:00
     */
    to: string | null;
    /**
     * Structured airing dates.
     */
    prop: {
        /**
         * Structured from date.
         */
        from: StructuredDateModel;
        /**
         * Structured end date.
         */
        to: StructuredDateModel;
    };
    /**
     * The date in a readable format.
     *
     * @example Apr 3, 1998 to Apr 24, 1999
     * @example Apr, 2019 to ?
     */
    string: string;
}

/**
 * Model for a structured date.
 */
interface StructuredDateModel {
    /**
     * The day of this date.
     */
    day: number | null;
    /**
     * The month of this date.
     */
    month: number | null;
    /**
     * The year of this date.
     */
    year: number | null;
}

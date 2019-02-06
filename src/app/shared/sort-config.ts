import { SortField } from './sort-field';

export class SortConfig {
    /** this and SOrtEvemt is almost same except this file has visible property Rajat singh jan15 */
     /**
   * A list of sortable fields
   */
    fields: SortField[];
    /**
     * True if sort is ascending
     */
    isAscending?: boolean;
     /**
   * True if sort should be shown
   */
  visible?: boolean;
}

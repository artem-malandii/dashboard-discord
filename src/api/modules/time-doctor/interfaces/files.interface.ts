export interface FilesQueryParams extends Record<string, string | undefined> {
  company: string;
  user?: string;
  tag?: string;
  page?: string;
  limit?: string;
  sort?:
    | 'date'
    | 'entity'
    | 'avg-activity'
    | 'duplicate'
    | 'isBlured'
    | '_date'
    | '_entity'
    | '_avg-activity'
    | '_duplicate'
    | '_isBlured';
  'filter[date]'?: string;
  'filter[entity]'?: string;
  'filter[avg-activity]'?: string;
  'filter[duplicate]'?: string;
  'filter[isBlured]'?: string;
}

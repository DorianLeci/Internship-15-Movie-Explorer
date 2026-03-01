import { MovieSortBy } from '../enums/MovieSortBy';

export const SortOptionsMap: Record<MovieSortBy, string> = {
  [MovieSortBy.POPULARITY]: 'Popularity',
  [MovieSortBy.RATING]: 'Rating',
  [MovieSortBy.RELEASE_DATE]: 'Release Date',
  [MovieSortBy.TITLE]: 'Title',
};

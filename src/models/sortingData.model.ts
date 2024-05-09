export interface SortDataModel {
  direction: SortDirection;
  sortBy: SortBy;
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  ALPHABETICAL = "alphabetical",
  RATING = "rating",
  YEAR = "year",
}

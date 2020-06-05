import { Observable } from "rxjs";

export interface IListDataService {
  getLibraries<T>(
    selectedFields: string,
    filter: string,
    orderBy: string,
    isAscending: boolean
  ): Observable<T[]>;
}

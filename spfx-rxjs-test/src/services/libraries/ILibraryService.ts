import { Observable } from "rxjs";

export interface ILibraryService {
  getLibraries(): Observable<ILibraries[]>;
}

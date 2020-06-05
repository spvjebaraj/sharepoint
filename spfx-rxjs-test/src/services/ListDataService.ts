import { IListDataService } from "./IListDataService";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { sp } from "@pnp/sp/presets/all";
import { ServiceKey } from "@microsoft/sp-core-library";

const SERVICE_KEY_TOKEN = "ListDataService";

export class ListDataService implements IListDataService {
  public static readonly ListDataServiceKey = ServiceKey.create<
    IListDataService
  >(SERVICE_KEY_TOKEN, ListDataService);

  public getLibraries<T>(
    selectedFields: string,
    filter: string,
    orderBy: string,
    isAscending: boolean
  ): Observable<T[]> {
    return from(
      sp.web.lists
        .filter(filter)
        .select(selectedFields)
        .orderBy(orderBy, isAscending)
        .get()
    ).pipe(
      map((res: T[]) => {
        return res;
      })
    );
  }
}

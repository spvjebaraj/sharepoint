import { ILibraryService } from "./ILibraryService";
import { Observable } from "rxjs";
import { ServiceScope, ServiceKey } from "@microsoft/sp-core-library";
import { ListDataService } from "../ListDataService";

const SERVICE_KEY_TOKEN = "LibrariesDataService";

export class LibraryService implements ILibraryService {
  private listService: ListDataService;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this.listService = serviceScope.consume(
        ListDataService.ListDataServiceKey
      );
    });
  }

  public static readonly LibraryServiceKey = ServiceKey.create<ILibraryService>(
    SERVICE_KEY_TOKEN,
    LibraryService
  );

  public getLibraries(): Observable<ILibraries[]> {
    const selectedFields = "Id,Title";
    const filter = "(BaseTemplate eq 101) and (Hidden eq false)";
    const orderBy = "Title";

    return this.listService.getLibraries(selectedFields, filter, orderBy, true);
  }
}

import { Injectable } from "@angular/core";

import { sp } from "@pnp/sp";
import { SPConfiguration } from "@pnp/sp/src/config/splibconfig";

@Injectable({
    providedIn: "root"
})
export class UserDataService {
    constructor() {
        const config: SPConfiguration = {
            sp: {
                headers: {
                    Accept: "application/json; odata=verbose"
                }
            }
        };
        sp.setup(config);
    }

    getCurrentUserDetails(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            sp.profiles.myProperties.get().then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        });
    }
}

import {UserService} from "./user.service";
import {AuthService} from "./auth/auth.service";

export function AppInitFactory(
     user: UserService,
     auth: AuthService,
    /* Extra dependencies */
): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise((resolve, reject) => {
            user.underConstruction().subscribe((res: any) => {
                    auth.isSiteUnderMaintenance = res[0].codeValue === "TRUE";
                    if (res[0].codeValue === 'TRUE') {
                        auth.logout();
                    }
                    resolve(true);
                },
                (err: any) => {
                    resolve(true);
                })

            // Add functions that return a Promise
            /* configDeps.push(configB(http, config, /!* Extra dependencies *!/)); // Will handle request B
               configDeps.push(configC(http, config, /!* Extra dependencies *!/)); // Will handle request C*/

            // Return resolved Promise when dependant functions are resolved


        });
    };
}


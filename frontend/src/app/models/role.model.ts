import { Authority } from "../models/authority.model";

export class Role {
    id: Number;
    rolename: String;
    authorities: Array<Authority>;
    isEnable: boolean;
}

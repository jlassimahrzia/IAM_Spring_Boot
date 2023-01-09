import { Role } from "../models/role.model";

export class Employee {
    id?: Number;
    firstName: String;
    lastName: String;
    username: String;
    password?: String;
    roles?: Array<Role>;
    enable?: boolean;
}

import { Role } from "../models/role.model";

export class Employee {
    id?: Number;
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    roles?: Array<Role>;
    enable?: boolean;
}

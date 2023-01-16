import { Authority } from "../models/authority.model";

export class Token {
   sub: String;
   exp: Number;
   authorities : Authority[];
}


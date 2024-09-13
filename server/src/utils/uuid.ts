import { randomUUID, UUID } from "crypto";


export function genRandomUUID(): UUID {
    return randomUUID();
}


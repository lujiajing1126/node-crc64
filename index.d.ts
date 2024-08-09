import { Crc64 } from "./binding";
import { crc64Sync } from "./binding";
export function crc64Stream(stream: any, callback: (error: any, crc64: string) => void): void;
export function crc64File(fileName: any, callback: (error: any, crc64: string) => void): void;
export { Crc64, crc64Sync };

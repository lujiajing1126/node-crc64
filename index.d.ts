import {Crc64} from "./binding";
import {crc64Sync} from "./binding";
import {Stream} from "node:stream";

export function crc64Stream(stream: Stream, callback: (error: any, crc64: string) => void): void;

export {Crc64, crc64Sync};

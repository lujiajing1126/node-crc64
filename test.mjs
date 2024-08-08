import { crc64Sync, Crc64, crc64Stream } from './index.js'
import { createReadStream } from "fs"

const ret1 = crc64Sync("123456789");
const ret2 = crc64Sync(new Buffer("123456789"));
console.log(ret1)
console.log(ret2)

let c = new Crc64();
c.update("123456789")
console.log(c.sum())

let readStream = createReadStream("/Users/megrez/Downloads/vmutils-linux-amd64-v1.102.1.tar.gz");
crc64Stream(readStream, function (err, ret) {
    console.log("file crc: " + ret)
})
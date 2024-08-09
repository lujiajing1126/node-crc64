const { createReadStream } = require("fs")
const { Crc64, crc64Sync } = require("./binding")

const crc64Stream = (stream, callback) => {
  let hasError = false
  let d = new Crc64()
  stream.on("error", function (err) {
    hasError = true
    stream.destroy();
    return callback(err);
  });

  stream.on("data", function (chunk) {
    d.update(chunk)
  });

  stream.on("end", function () {
    if (hasError) return;

    return callback(undefined, d.sum());
  });
}

const crc64File = (fileName, callback) => {
  let readStream = createReadStream(fileName);
  crc64Stream(readStream, callback)
}

module.exports.Crc64 = Crc64
module.exports.crc64Sync = crc64Sync
module.exports.crc64Stream = crc64Stream
module.exports.crc64File = crc64File

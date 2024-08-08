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

module.exports.Crc64 = Crc64
module.exports.crc64Sync = crc64Sync
module.exports.crc64Stream = crc64Stream

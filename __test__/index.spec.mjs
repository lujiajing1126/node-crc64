import test from 'ava'

import { crc64Sync } from '../index.js'

test('gen crc64 from string', (t) => {
  t.is(crc64Sync("123456789"), '11051210869376104954')
})

test('gen crc64 from Buffer', (t) => {
  t.is(crc64Sync(Buffer.from("123456789")), '11051210869376104954')
})
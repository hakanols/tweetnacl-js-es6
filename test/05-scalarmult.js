import nacl from './../nacl-fast-es.js';
import test from './helpers/tap-esm.js';
import randomVectors from './data/scalarmult.random.js';
import util from './helpers/nacl-util.js'

test('nacl.scalarMult.base', function(t) {
  // This takes takes a bit of time.
  // Similar to https://code.google.com/p/go/source/browse/curve25519/curve25519_test.go?repo=crypto
  var golden = new Uint8Array([0x89, 0x16, 0x1f, 0xde, 0x88, 0x7b, 0x2b, 0x53, 0xde, 0x54,
    0x9a, 0xf4, 0x83, 0x94, 0x01, 0x06, 0xec, 0xc1, 0x14, 0xd6, 0x98, 0x2d,
    0xaa, 0x98, 0x25, 0x6d, 0xe2, 0x3b, 0xdf, 0x77, 0x66, 0x1a]);
  var input = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  for (var i = 0; i < 200; i++) {
    input = nacl.scalarMult.base(input);
  }
  t.equal(util.encodeBase64(input), util.encodeBase64(golden));
  t.end();
});

test('nacl.scalarMult and nacl.scalarMult.base random test vectors', function(t) {
  randomVectors.forEach(function(vec) {
    var pk1 = util.decodeBase64(vec[0]);
    var sk1 = util.decodeBase64(vec[1]);
    var pk2 = util.decodeBase64(vec[2]);
    var sk2 = util.decodeBase64(vec[3]);
    var out = util.decodeBase64(vec[4]);

    var jpk1 = nacl.scalarMult.base(sk1);
    t.equal(util.encodeBase64(jpk1), util.encodeBase64(pk1));
    var jpk2 = nacl.scalarMult.base(sk2);
    t.equal(util.encodeBase64(jpk2), util.encodeBase64(pk2));
    var jout1 = nacl.scalarMult(sk1, pk2);
    t.equal(util.encodeBase64(jout1), util.encodeBase64(out));
    var jout2 = nacl.scalarMult(sk2, pk1);
    t.equal(util.encodeBase64(jout2), util.encodeBase64(out));
  });
  t.end();
});

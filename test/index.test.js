const mom = require("../src");
const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
const multihashes = require("multihashes");

chai.should();
chai.use(chaiJsonEqual);

describe("MOM", function() {

	let expectedAddress = "0x05a56e2d52c817161883f50c441c3228cfe54d9f";

	describe("Standard message payloads", function() {

		it('should create a correct ADD message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([0]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createAddTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
		});

		it('should create a correct DELETE message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([1]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createDeleteTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
		});

		it('should create a correct UPDATE message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const updatedMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const updatedMessageMultiHash = multihashes.fromB58String(updatedMessageHash);
			const expectedData = Buffer.concat([Buffer.from([2]), originalMessageMultiHash, updatedMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createUpdateTransaction(expectedAddress, originalMessageMultiHash, updatedMessageMultiHash).should.jsonEqual(expectedPayload);
		});

		it('should create a correct REPLY message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const replyMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const replyMessageMultiHash = multihashes.fromB58String(replyMessageHash);
			const expectedData = Buffer.concat([Buffer.from([3]), originalMessageMultiHash, replyMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createReplyTransaction(expectedAddress, originalMessageMultiHash, replyMessageMultiHash).should.jsonEqual(expectedPayload);
		});

		it('should create a correct ENDORSE message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([4]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createEndorseTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
		});

		it('should create a correct DISAPPROVE message payload', function() {
			//TODO
		});

		it('should create a correct CLOSE ACCOUNT message payload', function() {
			//TODO
		});

		it('should create a correct CUSTOM message payload', function() {
			//TODO
		});

		it('should create a correct RAW message payload', function() {
			//TODO
		});

	});

});

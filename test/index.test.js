const mom = require("../src");
const chai = require('chai');
const expect = require('chai').expect
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
			expect(() => mom.createAddTransaction(expectedAddress, Buffer.from("test"))).to.throw();
		});

		it('should create a correct ADD & REFER message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const address = "0xF22E75d6d61D33aE38f8360574A8b72816176D20";
			const expectedData = Buffer.concat([Buffer.from([1]), messageMultiHash, Buffer.from(address)]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createAddAndReferTransaction(expectedAddress, messageMultiHash, address).should.jsonEqual(expectedPayload);
			expect(() => mom.createAddAndReferTransaction(expectedAddress, Buffer.from("test"), address)).to.throw();
			expect(() => mom.createAddAndReferTransaction(expectedAddress, messageMultiHash, "test")).to.throw();
		});

		it('should create a correct DELETE message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([2]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createDeleteTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createDeleteTransaction(expectedAddress, Buffer.from("test"))).to.throw();
		});

		it('should create a correct UPDATE message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const updatedMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const updatedMessageMultiHash = multihashes.fromB58String(updatedMessageHash);
			const expectedData = Buffer.concat([Buffer.from([3]), originalMessageMultiHash, updatedMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createUpdateTransaction(expectedAddress, originalMessageMultiHash, updatedMessageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createUpdateTransaction(expectedAddress, Buffer.from("test"), updatedMessageMultiHash)).to.throw();
			expect(() => mom.createUpdateTransaction(expectedAddress, originalMessageMultiHash, Buffer.from("test"))).to.throw();
		});

		it('should create a correct REPLY message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const replyMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const replyMessageMultiHash = multihashes.fromB58String(replyMessageHash);
			const expectedData = Buffer.concat([Buffer.from([4]), originalMessageMultiHash, replyMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createReplyTransaction(expectedAddress, originalMessageMultiHash, replyMessageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createReplyTransaction(expectedAddress, Buffer.from("test"), replyMessageMultiHash)).to.throw();
			expect(() => mom.createReplyTransaction(expectedAddress, originalMessageMultiHash, Buffer.from("test"))).to.throw();
		});

		it('should create a correct ENDORSE message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([5]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createEndorseTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createEndorseTransaction(expectedAddress, Buffer.from("test"))).to.throw();
		});

		it('should create a correct DISAPPROVE message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([6]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createDisapproveTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createDisapproveTransaction(expectedAddress, Buffer.from("test"))).to.throw();
		});

		it('should create a correct ENDORSE & REPLY message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const replyMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const replyMessageMultiHash = multihashes.fromB58String(replyMessageHash);
			const expectedData = Buffer.concat([Buffer.from([7]), originalMessageMultiHash, replyMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createEndorseAndReplyTransaction(expectedAddress, originalMessageMultiHash, replyMessageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createEndorseAndReplyTransaction(expectedAddress, Buffer.from("test"), replyMessageMultiHash)).to.throw();
			expect(() => mom.createEndorseAndReplyTransaction(expectedAddress, originalMessageMultiHash, Buffer.from("test"))).to.throw();
		});

		it('should create a correct DISAPPROVE & REPLY message payload', function() {
			const originalMessageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const originalMessageMultiHash = multihashes.fromB58String(originalMessageHash);
			const replyMessageHash = "QmQpHt3EoEppWrVt2tAV22VFKTZ9NrMwfAWSsGcBZv6WKw";
			const replyMessageMultiHash = multihashes.fromB58String(replyMessageHash);
			const expectedData = Buffer.concat([Buffer.from([8]), originalMessageMultiHash, replyMessageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createDisapproveAndReplyTransaction(expectedAddress, originalMessageMultiHash, replyMessageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createDisapproveAndReplyTransaction(expectedAddress, Buffer.from("test"), replyMessageMultiHash)).to.throw();
			expect(() => mom.createDisapproveAndReplyTransaction(expectedAddress, originalMessageMultiHash, Buffer.from("test"))).to.throw();
		});

		it('should create a correct CLOSE ACCOUNT message payload', function() {
			const messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
			const messageMultiHash = multihashes.fromB58String(messageHash);
			const expectedData = Buffer.concat([Buffer.from([253]), messageMultiHash]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createCloseAccountTransaction(expectedAddress, messageMultiHash).should.jsonEqual(expectedPayload);
			expect(() => mom.createCloseAccountTransaction(expectedAddress, Buffer.from("test"))).to.throw();
		});

		it('should create a correct RAW message payload', function() {
			const expectedData = Buffer.concat([Buffer.from([255]), Buffer.from("This is a test")]);
			const expectedPayload = { to: expectedAddress, value: 0, data: expectedData };
			mom.createRawTransaction(expectedAddress, Buffer.from("This is a test")).should.jsonEqual(expectedPayload);
			expect(() => mom.createRawTransaction(expectedAddress, Buffer.from(""))).to.throw("content is void");
		});

	});

});

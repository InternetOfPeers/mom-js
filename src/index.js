/**
 * JavaScript implementation of MOM.
 * It does NOT take care signing or sending the transaction to Ethereum,
 * but it creates the transaction's payload to be sent
 *
 * @module mom
 */
"use strict";

const cs = require("./constants");
const multihashes = require("multihashes");

/**
 *
 * @param {*} multiHash
 */
function encodeAddMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.ADD]), multiHash]);
}

/**
 *
 * @param {*} originalMultiHash
 * @param {*} updatedMultiHash
 */
function encodeUpdateMessage(originalMultiHash, updatedMultiHash) {
	try {
		multihashes.decode(originalMultiHash);
	} catch (error) {
		throw new Error(`original message is not a valid multiHash: ${error}`);
	}
	try {
		multihashes.decode(updatedMultiHash);
	} catch (error) {
		throw new Error(`updated message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.UPDATE]), originalMultiHash, updatedMultiHash]);
}

/**
 *
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
function encodeReplyMessage(originalMultiHash, replyMultiHash) {
	try {
		multihashes.decode(originalMultiHash);
	} catch (error) {
		throw new Error(`original message is not a valid multiHash: ${error}`);
	}
	try {
		multihashes.decode(replyMultiHash);
	} catch (error) {
		throw new Error(`reply message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.REPLY]), originalMultiHash, replyMultiHash]);
}

/**
 *
 * @param {*} multiHash
 */
function encodeDeleteMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.DELETE]), multiHash]);
}

/**
 *
 * @param {*} address
 * @param {*} multiHash
 */
exports.createAddTransaction = function createAddTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeAddMessage(multiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} updatedMultiHash
 */
exports.createUpdateTransaction = function createUpdateTransaction(address, originalMultiHash, updatedMultiHash) {
	return { to: address, value: 0, data: encodeUpdateMessage(originalMultiHash, updatedMultiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
exports.createReplyTransaction = function createReplyTransaction(address, originalMultiHash, replyMultiHash) {
	return { to: address, value: 0, data: encodeReplyMessage(originalMultiHash, replyMultiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} multiHash
 */
exports.createDeleteTransaction = function createDeleteTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeDeleteMessage(multiHash) };
};

exports.operations = cs.operations;

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
function encodeEndorseMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.ENDORSE]), multiHash]);
}

/**
 *
 * @param {*} multiHash
 */
function encodeDisapproveMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.DISAPPROVE]), multiHash]);
}

/**
 *
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
function encodeEndorseAndReplyMessage(originalMultiHash, replyMultiHash) {
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
	return Buffer.concat([Buffer.from([cs.operations.ENDORSE_AND_REPLY]), originalMultiHash, replyMultiHash]);
}

/**
 *
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
function encodeDisapproveAndReplyMessage(originalMultiHash, replyMultiHash) {
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
	return Buffer.concat([Buffer.from([cs.operations.DISAPPROVE_AND_REPLY]), originalMultiHash, replyMultiHash]);
}

/**
 *
 * @param {*} multiHash
 */
function encodeCloseAccountMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.CLOSE_ACCOUNT]), multiHash]);
}

/* =========================================================================
 *
 * Public functions
 *
 * ========================================================================= */

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
 * @param {*} multiHash
 */
exports.createDeleteTransaction = function createDeleteTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeDeleteMessage(multiHash) };
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
exports.createEndorseTransaction = function createEndorseTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeEndorseMessage(multiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} multiHash
 */
exports.createDisapproveTransaction = function createDisapproveTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeDisapproveMessage(multiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
exports.createEndorseAndReplyTransaction = function createEndorseAndReplyTransaction(address, originalMultiHash, replyMultiHash) {
	return { to: address, value: 0, data: encodeEndorseAndReplyMessage(originalMultiHash, replyMultiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
exports.createDisapproveAndReplyTransaction = function createDisapproveAndReplyTransaction(address, originalMultiHash, replyMultiHash) {
	return { to: address, value: 0, data: encodeDisapproveAndReplyMessage(originalMultiHash, replyMultiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
exports.createCloseAccountTransaction = function createCloseAccountTransaction(address, originalMultiHash, replyMultiHash) {
	return { to: address, value: 0, data: encodeCloseAccountMessage(originalMultiHash, replyMultiHash) };
};

exports.operations = cs.operations;

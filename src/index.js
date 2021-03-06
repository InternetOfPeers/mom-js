/**
 * JavaScript implementation of MOM.
 * It does NOT take care signing or sending the transaction to Ethereum,
 * but it creates the transaction's payload to be sent
 *
 * @module mom
 */
"use strict";

const cs = require("./constants");
const ethers = require("ethers");
const multihashes = require("multihashes");
const { assert } = require("chai");

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
 * @param {*} address
 */
function encodeAddAndReferMessage(multiHash, referredAddress) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	if (!ethers.utils.isAddress(referredAddress))
		throw new Error(`address '${referredAddress}' is not a valid Ethereum address.`);
	return Buffer.concat([Buffer.from([cs.operations.ADD_AND_REFER]), multiHash, Buffer.from(referredAddress)]);
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
 * @param {*} updatedMultiHash
 */
function encodeUpdateAndReferMessage(originalMultiHash, updatedMultiHash, referredAddress) {
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
	if (!ethers.utils.isAddress(referredAddress))
		throw new Error(`address '${referredAddress}' is not a valid Ethereum address.`);
	return Buffer.concat([Buffer.from([cs.operations.UPDATE_AND_REFER]), originalMultiHash, updatedMultiHash, Buffer.from(referredAddress)]);
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
function encodeRemoveEndorsementMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.REMOVE_ENDORSEMENT]), multiHash]);
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
 * @param {*} multiHash
 */
function encodeRemoveDisapprovalMessage(multiHash) {
	try {
		multihashes.decode(multiHash);
	} catch (error) {
		throw new Error(`message is not a valid multiHash: ${error}`);
	}
	return Buffer.concat([Buffer.from([cs.operations.REMOVE_DISAPPROVAL]), multiHash]);
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

/**
 *
 * @param {*} anyContent
 */
function encodeRawMessage(anyContent) {
	try {
		assert.isNotEmpty(anyContent);
	} catch (error) {
		throw new Error(`content is void`);
	}
	return Buffer.concat([Buffer.from([cs.operations.RAW]), anyContent]);
}

/* =========================================================================
 *
 * Core functions
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

/**
 *
 * @param {*} address
 * @param {*} multiHash
 */
exports.createCloseAccountTransaction = function createCloseAccountTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeCloseAccountMessage(multiHash) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} replyMultiHash
 */
exports.createRawTransaction = function createRawTransaction(address, anyContent) {
	return { to: address, value: 0, data: encodeRawMessage(anyContent) };
};

/* =========================================================================
 *
 * Extended functions
 *
 * ========================================================================= */

/**
 *
 * @param {*} address
 * @param {*} multiHash
 */
exports.createAddAndReferTransaction = function createAddAndReferTransaction(address, multiHash, referencedAddress) {
	return { to: address, value: 0, data: encodeAddAndReferMessage(multiHash, referencedAddress) };
};

/**
 *
 * @param {*} address
 * @param {*} originalMultiHash
 * @param {*} updatedMultiHash
 * @param {*} referredAddress
 */
exports.createUpdateAndReferTransaction = function createUpdateAndReferTransaction(address, originalMultiHash, updatedMultiHash, referredAddress) {
	return { to: address, value: 0, data: encodeUpdateAndReferMessage(originalMultiHash, updatedMultiHash, referredAddress) };
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
exports.createRemoveEndorsementTransaction = function createRemoveEndorsementTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeRemoveEndorsementMessage(multiHash) };
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
 * @param {*} multiHash
 */
exports.createRemoveDisapprovalTransaction = function createRemoveDisapprovalTransaction(address, multiHash) {
	return { to: address, value: 0, data: encodeRemoveDisapprovalMessage(multiHash) };
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

exports.operations = cs.operations;

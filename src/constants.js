"use strict";

exports.operations = Object.freeze({
	ADD: 0x0,
	DELETE: 0x1,
	UPDATE: 0x2,
	REPLY: 0x3,
	ENDORSE: 0x4,
	DISAPPROVE: 0x5,
	ENDORSE_AND_REPLY: 0x6,
	DISAPPROVE_AND_REPLY: 0x7,
	CLOSE_ACCOUNT: 0xFD,
	RAW: 0xFF
});

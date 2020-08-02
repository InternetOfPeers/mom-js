"use strict";

exports.operations = Object.freeze({
	ADD: 0x0,
	ADD_AND_REFER: 0x1,
	DELETE: 0x2,
	UPDATE: 0x3,
	REPLY: 0x4,
	ENDORSE: 0x5,
	DISAPPROVE: 0x6,
	ENDORSE_AND_REPLY: 0x7,
	DISAPPROVE_AND_REPLY: 0x8,
	CLOSE_ACCOUNT: 0xFD,
	RAW: 0xFF
});

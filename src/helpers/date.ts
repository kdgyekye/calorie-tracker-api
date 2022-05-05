"use strict";

export function __getDateStart(_date: Date | string): Date {
	return new Date(
		new Date(_date)
			.setHours(0, 0, 0, 0)
	)
}

export function __getDateEnd(_date: Date | string): Date {
	return new Date(
		new Date(_date)
			.setHours(23, 59, 59, 999)
	)
}

export default {
	__getDateStart,
	__getDateEnd
}
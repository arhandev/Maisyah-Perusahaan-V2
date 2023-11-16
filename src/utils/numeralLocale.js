import numeral from 'numeral';

// load a locale
if (numeral.locales['id'] === undefined) {
	// @ts-ignore
	numeral.register('locale', 'id', {
		delimiters: {
			thousands: '.',
			decimal: ',',
		},
		abbreviations: {
			thousand: 'rb',
			million: 'JT',
			billion: 'M',
			trillion: 'T',
		},
		currency: {
			symbol: 'IDR',
		},
	});
}

// switch between locales
numeral.locale('id');

export default numeral;

import dayjs from "dayjs";

export const getTimeJob = Datetime => {
	const current = dayjs();
	const dateCreated = dayjs(Datetime, 'YYYY-MM-DD hh:mm:ss');
	const duration = dayjs.duration(current.diff(dateCreated));
	if (duration.asSeconds() < 60) {
		return Math.floor(duration.asSeconds()) + ' detik yang lalu';
	} else if (duration.asMinutes() < 60) {
		return Math.floor(duration.asMinutes()) + ' menit yang lalu';
	} else if (duration.asHours() < 24) {
		return Math.floor(duration.asHours()) + ' jam yang lalu';
	} else {
		return Math.floor(duration.asDays()) + ' hari yang lalu';
	}
};

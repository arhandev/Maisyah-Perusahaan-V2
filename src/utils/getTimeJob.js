import dayjs from "dayjs";

export const getTimeJob = (Datetime) => {
  const current = dayjs();
  const dateCreated = dayjs(Datetime, "YYYY-MM-DD hh:mm:ss");
  const dur = dayjs.duration(current.diff(dateCreated));
  if (dur.asSeconds() < 60) {
    return Math.floor(dur.asSeconds()) + " detik yang lalu";
  } else if (dur.asMinutes() < 60) {
    return Math.floor(dur.asMinutes()) + " menit yang lalu";
  } else if (dur.asHours() < 24) {
    return Math.floor(dur.asHours()) + " jam yang lalu";
  } else {
    return Math.floor(dur.asDays()) + " hari yang lalu";
  }
};

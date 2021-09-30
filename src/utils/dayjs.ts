import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const dayjsDate = (date: any, format = "DD-MM-YYYY") => {
  return dayjs(date).format(format);
};

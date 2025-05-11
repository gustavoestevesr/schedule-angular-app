import { Colors } from "../enums/calendar-view.enum";

export interface IAppointment {
  uuid?: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color: Colors;
}

export interface IAppointment {
  uuid?: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

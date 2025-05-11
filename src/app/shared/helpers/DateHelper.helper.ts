export abstract class DateHelper {
  static get weekDays() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  static isSameDate(date1: Date, date2: Date): boolean {
    const date1Converted = new Date(date1);
    const date2Converted = new Date(date2);

    return (
      date1Converted.getDate() === date2Converted.getDate() &&
      date1Converted.getMonth() === date2Converted.getMonth() &&
      date1Converted.getFullYear() === date2Converted.getFullYear()
    );
  }

  static isInTime(startTime: string, endTime: string, timeSlot: string): boolean {
    const startMinutes = DateHelper.timeToMinutes(startTime);
    const endMinutes = DateHelper.timeToMinutes(endTime);
    const slotStart = DateHelper.timeToMinutes(timeSlot);
    const slotEnd = slotStart + 60; // Assume duração de 1h para o slot

    // Verifica se há interseção entre o slot e o intervalo do appointment
    return slotStart < endMinutes && slotEnd > startMinutes;
  }

  static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  static isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }



}

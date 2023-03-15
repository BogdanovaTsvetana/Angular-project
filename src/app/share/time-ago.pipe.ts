import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    // const firstDate = new Date('2020-02-20T09:53:40.324+00:00');
    const firstDate = new Date(value);
    const currentDate = new Date();    
    const millisecondsDiff = currentDate.getTime() - firstDate.getTime();

    const miliseconds = 1000;
    const minute = 60 * miliseconds;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30.5 * day;
    const year = 365 * day;

    if (millisecondsDiff < minute) {
      let seconds = Math.floor(millisecondsDiff / miliseconds);
      return seconds >= 2 ? `${seconds} seconds ago` : `${seconds} second ago`;
    }
    if (millisecondsDiff < hour) {
      let minutes = Math.floor(millisecondsDiff / minute);
      return minutes >= 2 ? `${minutes} minutes ago` : `${minutes} minute ago`;
    }
    if (millisecondsDiff < day) {
      let hours = Math.floor(millisecondsDiff / hour);
      return hours >= 2 ? `${hours} hours ago` : `${hours} hour ago`
    }
    if (millisecondsDiff < month) {
      let days = Math.floor(millisecondsDiff / day);
      return days >= 2 ? `${days} days ago` : `${days} day ago`;
    }
    if (millisecondsDiff < year) {
      let months = Math.floor(millisecondsDiff / month);
      return months >= 2 ? `${months} months ago` : `${months} month ago`;
    }
    // if (millisecondsDiff >= year) {
    //   let years = Math.floor(millisecondsDiff / year);
    //   return years >= 2 ? `${years} years ago` : `${years} year ago`;
    // }
    let years = Math.floor(millisecondsDiff / year);
    return years >= 2 ? `${years} years ago` : `${years} year ago`;
 
  }
}

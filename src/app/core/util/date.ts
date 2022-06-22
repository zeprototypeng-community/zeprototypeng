import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'dateFormatPipe',
})
export class DateHelper implements PipeTransform {
    transform(value: string, locale: string = 'en-US', format: string = 'yyyy-MM-dd') {
        var datePipe = new DatePipe(locale);        
        value = datePipe.transform(this.convertFromStringToDate(value), format);
        return value;
    }

    convertFromStringToDate(responseDate) {
        let dateComponents = responseDate.split('T');
        let datePieces = dateComponents[0].split("/");
        return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
    }
}
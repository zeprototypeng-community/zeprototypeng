import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'dateFormatPipe',
})
export class DateHelper implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-US");        
        value = datePipe.transform(this.convertFromStringToDate(value), 'yyyy-MM-dd');
        return value;
    }

    convertFromStringToDate(responseDate) {
        let dateComponents = responseDate.split('T');
        let datePieces = dateComponents[0].split("/");
        return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
    }
}
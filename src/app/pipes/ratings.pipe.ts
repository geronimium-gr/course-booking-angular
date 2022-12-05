import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratings'
})
export class RatingsPipe implements PipeTransform {

  newValue!: number;

  transform(value: number) {

    if (value === null) {
      console.log("Not a number");
      return (new Array());
    }

    return (new Array(value));
  }

}

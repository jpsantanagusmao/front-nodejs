import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjPipe'
})
export class CnpjPipePipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    return value.replace(/^(\d{2})?(\d{0,5})/, '($1)');
  }

}

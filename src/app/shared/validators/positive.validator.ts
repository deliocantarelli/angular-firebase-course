import { FormControl } from '@angular/forms';


export function validateIntegerPositive(form: FormControl) {
    const value = form.value;

    const result = value >= 0 ? null :  {
        validInteger: {
            valid: false
        }
    };

    return Promise.resolve(result);
}

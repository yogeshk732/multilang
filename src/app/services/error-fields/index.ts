/*
If you wish to override this behavior (e.g. to show the error as soon as the invalid
    control is dirty or when a parent form group is invalid), you can use the
    errorStateMatcher property of the matInput. The property takes an instance of an
    ErrorStateMatcher object. An ErrorStateMatcher must implement a single method
    isErrorState which takes the FormControl for this matInput as well as the parent form
    and returns a boolean indicating whether errors should be shown. (true indicating that
    they should be shown, and false indicating that they should not.)

    https://material.angular.io/components/input/overview#custom-error-matcher
    #component
    matcher = new MyErrorStateMatcher();
    #HTML
    [errorStateMatcher]="matcher"
*/

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}

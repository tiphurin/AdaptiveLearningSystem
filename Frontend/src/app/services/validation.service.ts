import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: any,validatorValue?: any, nameField?: string){
    const messages = {
      'required' : `Please input field "${nameField}"`,
      'email' : `Input only "${nameField}"`,
      'minlength' : `"${nameField}" min length of ${validatorValue.requiredLength} characters`,
      'maxlength': `"${nameField}" max length of ${validatorValue.requiredLength} characters`
    };

    for (const [key, value] of Object.entries(messages)) {
      if (key === validatorName){
        return value;
      }
    }

    return ;
  }
}

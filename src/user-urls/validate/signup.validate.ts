import { BadRequestException } from "@nestjs/common";
import { errorMessage } from "../messages";
import { createForm } from "../model";

export function importDataForValidate(data: createForm): object {

    var listOfErrors: Array<string> = []
    var countOfuniques: Array<string> = []
    var countOfIsPassword: Array<string> = []

    const parseSignupFields = JSON.parse(data.signupFields)

    for (var keys in parseSignupFields) {
        // For unique fields


        if (parseSignupFields[keys].unique) {

            if (!parseSignupFields[keys].inLogin) {
                listOfErrors.push(errorMessage.uniqueFieldMustBeInLogin)
            }
            if (!parseSignupFields[keys].required) {
                listOfErrors.push(errorMessage.uniqueMustBeRequired)
            }
            countOfuniques.push(keys)
        }
        // For every fields that inLogin were true
        if (parseSignupFields[keys].inLogin) {
            if (!parseSignupFields[keys].required) {
                listOfErrors.push(errorMessage.inLoginMustBeRequired)
            }
        }
        if (parseSignupFields[keys].isPassword) {
            countOfIsPassword.push(keys)
        }
        if (parseSignupFields[keys].isPassword) {
            if (!parseSignupFields[keys].required || !
                parseSignupFields[keys].inLogin || parseSignupFields[keys].unique) {
                listOfErrors.push(errorMessage.passwordFieldRequierd)
            }
        }

    }
    if (countOfuniques.length < 1 || countOfuniques.length > 1) {
        listOfErrors.push(errorMessage.countOfUnique)
    } else if (countOfIsPassword.length < 1 || countOfIsPassword.length > 1) {
        listOfErrors.push(errorMessage.countOfIsPassword)
    }
    if (listOfErrors.length > 0) {
        throw new BadRequestException(listOfErrors)
    }
    return data
}
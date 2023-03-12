import { BadRequestException } from "@nestjs/common"
import { authModuleMessages } from "src/_messages"

export function validateInputDataFromUrLsUser(signupForm: object, bodyData: object): object {
    var validData = {}
    var uniqueField = []
    try {
        const listOfSignupKeys = Object.keys(signupForm)
        for (var field of listOfSignupKeys) {

            if (signupForm[field].unique) uniqueField = [...uniqueField, field, bodyData[field]]

            if (signupForm[field].required) {
                if (!bodyData[field]) throw new BadRequestException(authModuleMessages.emptyRequiredFields)
            }
            validData = { ...validData, [field]: bodyData[field] }
        }
        return { validData, uniqueField }
    } catch (error) {
        throw error
    }
}
// export function validateInputDataFromUrLsUser(loginForm: Array<string>, bodyData: object): object {
//     var validData = {}
//     try {
//         for (var field of loginForm) {
//             if (!bodyData[field]) throw new BadRequestException(authModuleMessages.emptyFields)
//             validData = { ...validData, [field]: bodyData[field] }
//         }
//         return validData
//     } catch (error) {
//         throw error
//     }
// }
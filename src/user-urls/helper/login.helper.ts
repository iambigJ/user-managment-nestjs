export function setLoginFields(data: object) {

    const signupFields = JSON.parse(data["signupFields"])

    var listOfLoginKeys: Array<string> = []

    for (var keys in signupFields) {
        if (signupFields[keys].inLogin === true) {
            listOfLoginKeys.push(keys)
        }
    }
    data["loginFields"] = listOfLoginKeys
}
export function seturls(data: object) {
    data["signupUrl"] = `${process.env.APP_URL}/api/signupUser?code=${data["code"]}&serviceId=${data["userId"]}`
    data["loginUrl"] = `${process.env.APP_URL}/api/loginUser?code=${data["code"]}&serviceId=${data["userId"]}`
}
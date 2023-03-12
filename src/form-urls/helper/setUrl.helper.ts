export function seturls(data: object): void {
    data["signupUrl"] = `${process.env.APP_URL}/api/signupUser?code=${data["code"]}&userId=${data["userId"]}`
    data["loginUrl"] = `${process.env.APP_URL}/api/loginUser?code=${data["code"]}&userId=${data["userId"]}`
}
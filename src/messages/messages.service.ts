import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    constructor() { }
    ok(message: any): object {
        return {
            "statusCode": 200,
            "message": message,
        }
    }
    create(message: any) {
        return {
            "statusCode": 201,
            "message": message,
        }
    }
    credentialsError(): string {
        return "Credentials error!"
    }
    passwordOrEmailWereWrong(): string {
        return "Password or email were wrong!"
    }
    unAuthorized(): string {
        return "Un authorized!"
    }
    notFound(): string {
        return "Not found!"
    }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorMessagesService {
    constructor() { }

    credentialsError(): string {
        return "Credentials error!"
    }
    passwordOrEmailWereWrong(): string {
        return "Password or email were wrong!"
    }
    userIdNotFound(): string {
        return "Sorry user with this id not found!"
    }
}

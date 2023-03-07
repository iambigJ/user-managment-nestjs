import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessagesService } from 'src/error-messages/error-messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createForm } from './model';

@Injectable()
export class UserUrlsService {
    constructor(
        private prisma: PrismaService,
        private errorMessage: ErrorMessagesService
    ) { }

    async createUrl(validateData: createForm): Promise<object> {
        try {
            const url = await this.prisma.url.create({ data: validateData })
            console.log(typeof url.signupFields)
            return {
                Signup: {
                    url: url.signupUrl,
                    keys: JSON.parse(url.signupFields as string)
                },
                Login: {
                    url: url.loginUrl,
                    keys: url.loginFields
                }
            }
        } catch (error) {
            if (error.code === "P2003") {
                throw new NotFoundException(this.errorMessage.userIdNotFound())
            }
        }
    }
}

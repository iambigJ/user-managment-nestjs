import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { signupValidQueris, validQuerisForGetForm } from './dto';
import { validateInputDataFromUrLsUser } from './middleware';

@Injectable()
export class AuthUrlsService {
    constructor(private prisma: PrismaService, private globalMessage: MessagesService) { }

    async signupFieldsByCode_service(queries: validQuerisForGetForm): Promise<object> {
        try {
            const form = await this.prisma.url.findFirst({
                where: {
                    code: queries.code,
                    userId: queries.userId
                }
            })
            if (!form) throw new NotFoundException(this.globalMessage.notFound())
            const parseSignupFields = JSON.parse(form.signupFields as string)
            return parseSignupFields
        } catch (error) {
            throw error
        }
    }

    async signupUserOfUrl_service(data: signupValidQueris): Promise<any> {
        try {
            const form = await this.prisma.url.findFirst({
                where: {
                    userId: data.userId,
                    code: data.formCode,
                    deletedAt: null
                }
            })
            if (!form) throw new NotFoundException(this.globalMessage.notFound())
            else {
                const parseSignupFields = JSON.parse(form["signupFields"] as string)
                const doValidationData = validateInputDataFromUrLsUser(parseSignupFields, data.signupFields)
                data.signupFields = doValidationData["validData"]

                const uniquedata = doValidationData["uniqueField"]

                const filterList = await this.prisma.usersMembers.findMany({
                    where: {
                        userId: data.userId,
                        formCode: data.formCode,
                        ban: false,
                    }
                })
                for (var i = 0; i < filterList.length; i++) {
                    if (filterList[i]["signupFields"][uniquedata[0]] === uniquedata[1]) throw new BadRequestException(this.globalMessage.duplicateUniqueValue(uniquedata[0]))
                }

                const user = await this.prisma.usersMembers.create({ data })
                return user
            }
        } catch (error) {
            throw error
        }
    }
}

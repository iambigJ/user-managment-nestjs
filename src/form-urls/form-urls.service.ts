import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createForm } from './model';

@Injectable()
export class UserUrlsService {
    constructor(
        private prisma: PrismaService,
        private globalMessage: MessagesService
    ) { }

    async fetchListOfForms_service(userId: number) {

        try {
            const listOfForms = await this.prisma.url.findMany({
                where: {
                    userId
                }
            })
            return listOfForms
        } catch (error) {
            throw error
        }
    }


    async fetchFormById_service(userId: number, formId: number) {

        try {
            const form = await this.prisma.url.findFirst({
                where: {
                    id: formId,
                    userId
                }
            })

            if (!form) throw new NotFoundException(this.globalMessage.notFound())

            return form

        } catch (error) {
            throw error
        }
    }


    async createForm_service(validateData: createForm): Promise<object> {
        try {
            const url = await this.prisma.url.create({ data: validateData })
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
                throw new NotFoundException(this.globalMessage.notFound())
            }
            throw error
        }
    }


    async deleteform_service(userId: number, formId: number) {
        try {
            const form = await this.prisma.url.findUnique({
                where: {
                    id: formId
                }
            })
            if (!form) throw new NotFoundException(this.globalMessage.notFound())
            if (form.userId !== userId) throw new UnauthorizedException(this.globalMessage.unAuthorized())

            const updateForm = await this.prisma.url.update({
                where: {
                    id: formId
                },
                data: {
                    deletedAt: new Date()
                }
            })

            return updateForm

        } catch (error) {
            throw error
        }
    }


    async restoreForm_service(userId: number, formId: number) {
        try {
            const form = await this.prisma.url.findUnique({
                where: {
                    id: formId
                }
            })
            if (!form) throw new NotFoundException(this.globalMessage.notFound())
            if (form.userId !== userId) throw new UnauthorizedException(this.globalMessage.unAuthorized())

            const updateForm = await this.prisma.url.update({
                where: {
                    id: formId
                },
                data: {
                    deletedAt: null
                }
            })

            return updateForm

        } catch (error) {
            throw error
        }
    }

}
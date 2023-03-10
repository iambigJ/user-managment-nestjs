import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService, private globalMessage: MessagesService) { }


    async fethcListOfusers_service(): Promise<object> {
        try {
            const users = await this.prisma.user.findMany()
            return users
        } catch (error) {
            throw error
        }
    }


    async fetchUserById_service(id: number): Promise<object> {

        try {
            const user = await this.prisma.user.findUnique({ where: { id } })
            if (!user) {
                throw new NotFoundException(this.globalMessage.notFound())
            }
            return user
        } catch (error) {
            throw error
        }
    }


    async deleteUser_service(id: number): Promise<object> {

        try {
            const user = await this.prisma.user.update({
                where: {
                    id
                },
                data: {
                    deletedAt: new Date()
                }
            })

            return user
        } catch (error) {
            if (error.code === "P2025") throw new NotFoundException(this.globalMessage.notFound())
            throw error
        }
    }


    async restoreUser_service(id: number): Promise<object> {

        try {
            const user = await this.prisma.user.update({
                where: {
                    id
                },
                data: {
                    deletedAt: null
                }
            })

            return user
        } catch (error) {
            if (error.code === "P2025") throw new NotFoundException(this.globalMessage.notFound())
            throw error
        }
    }


    async toggleActivation_service(id: number): Promise<object> {

        try {
            const user = await this.prisma.user.findUnique({ where: { id } })
            if (!user) throw new NotFoundException(this.globalMessage.notFound())

            const toggleActivation = await this.prisma.user.update({ where: { id }, data: { ban: !user.ban } })
            return toggleActivation
        } catch (error) {
            if (error.code === "P2025") throw new NotFoundException(this.globalMessage.notFound())
            throw error
        }
    }


}

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MessagesService } from "src/messages/messages.service";
import { PrismaService } from "src/prisma/prisma.service";
import { userUpdateDto } from "./dto";
import { validateAccount } from "./middleware";


@Injectable()

export class UserService {
    constructor(private prisma: PrismaService, private globalMessage: MessagesService) { }
    async me_service(userId: number): Promise<object> {
        try {
            const user = await this.prisma.user.findFirst({ where: { id: userId } })
            const validateUser = validateAccount(user)
            return validateUser
        } catch (error) {
            throw error
        }
    }


    async updateUser_service(id: number, dto: userUpdateDto): Promise<object> {

        try {
            const user = await this.prisma.user.update({ where: { id }, data: dto })
            const validateUser = validateAccount(user)
            return validateUser
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
}
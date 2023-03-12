import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "../../_messages"

export function validateAccount(data: object): object | never {
    try {
        if (!data) throw new NotFoundException(messages.notFound)
        else if (data["ban"]) throw new BadRequestException(messages.ban)
        else if (data["deletedAt"]) throw new BadRequestException(messages.deletedAcount)
        return data
    } catch (error) {
        throw error
    }
}
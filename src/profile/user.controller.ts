import { Body, Controller, Delete, Get, Param, Patch, Put, Req } from "@nestjs/common";
import { Request } from "express"
import { MessagesService } from "src/messages/messages.service";
import { userUpdateDto } from "./dto";
import { UserService } from "./user.service";



@Controller("user")

export class UserController {
    constructor(private UserService: UserService, private globalMessage: MessagesService) { }
    @Get("me")
    async meGET_controller(@Req() req: Request): Promise<object> {
        const userId = req.user["sub"]
        const result = await this.UserService.me_service(userId as number)
        return this.globalMessage.ok(result)
    }

    @Put("me/update")
    async updateUserPUT_controller(@Req() req: Request, @Body() dto: userUpdateDto) {
        const userId = req.user["sub"]
        const result = await this.UserService.updateUser_service(userId as number, dto)
        return this.globalMessage.ok(result)
    }

    @Delete("me/delete")
    async deleteUserDELETE_controller(@Req() req: Request) {
        const userId = req.user["sub"]
        const result = await this.UserService.deleteUser_service(userId as number)
        return this.globalMessage.ok(result)
    }

    @Patch("me/restore")
    async restoreUserPATCH_controller(@Req() req: Request) {
        const userId = req.user["sub"]
        const result = await this.UserService.restoreUser_service(userId as number)
        return this.globalMessage.ok(result)
    }

}
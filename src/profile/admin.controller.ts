import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MessagesService } from 'src/messages/messages.service';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {
    constructor(private globalMessage: MessagesService, private ProfileService: AdminService) { }

    @Get("list")
    async fethcListOfusersGET_controller(@Req() req: Request) {
        const result = await this.ProfileService.fethcListOfusers_service()
        return this.globalMessage.ok(result)
    }

    @Get(":userId")
    async fetchUserByIdGET_controller(@Param("userId") userId: string) {
        const id = parseInt(userId)
        const result = await this.ProfileService.fetchUserById_service(id)
        return this.globalMessage.ok(result)
    }

    // @Post("new")
    // async createUserPOST_controller(@Body() dto: AddUserDto) {

    // }

    // @Put()
    // async updateUserPUT_controller() { }

    @Delete(":userId")
    async deleteUserDELETE_controller(@Param("userId") userId: string) {
        const id = parseInt(userId)
        const result = await this.ProfileService.deleteUser_service(id)
        return this.globalMessage.ok(result)
    }

    @Patch("restore/:userId")
    async restoreUserPATCH_controller(@Param("userId") userId: string) {
        const id = parseInt(userId)
        const result = await this.ProfileService.restoreUser_service(id)
        return this.globalMessage.ok(result)
    }

    @Patch("activation/:userId")
    async toggleActivationPATCH_controller(@Param("userId") userId: string) {
        const id = parseInt(userId)
        const result = await this.ProfileService.toggleActivation_service(id)
        return this.globalMessage.ok(result)
    }
}

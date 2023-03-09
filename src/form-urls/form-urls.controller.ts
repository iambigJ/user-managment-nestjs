import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from "express"
import { formDto } from './dto';
import * as randomSTR from "randomstring"
import { setLoginFields, seturls } from './helper';
import { createForm } from './model';
import { UserUrlsService } from './form-urls.service';
import { importDataForValidate } from './validate';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from 'src/messages/messages.service';


@Controller('form')
@UseGuards(AuthGuard("jwt"))
export class UserUrlsController {
    constructor(private userUrlService: UserUrlsService, private globalMessage: MessagesService) { }


    @Get("list")
    async fetchListOfFormsGET_controller(@Req() req: Request) {
        const userId: number = req.user["userId"]
        const result = await this.userUrlService.fetchListOfForms_service(userId as number)
        return this.globalMessage.ok(result)
    }

    @Get(":id")
    async fetchFormByIdGET_controller(@Param() id: string, @Req() req: Request) {
        const userId: number = req.user["userId"]
        const formId: number = parseInt(id["id"])
        const result = await this.userUrlService.fetchFormById_service(userId as number, formId as number)
        return this.globalMessage.ok(result)
    }


    @Post('new/:id')
    async createFormPOST_controller(@Param() id: string, @Body() dto: formDto) {
        const data: createForm = {
            userId: parseInt(id["id"]),
            domain: dto.domain,
            signupFields: JSON.stringify(dto.signupFields),
            signupUrl: '',
            loginUrl: '',
            loginFields: '',
            code: randomSTR.generate(20)
        }
        importDataForValidate(data)
        setLoginFields(data)
        seturls(data)
        const result = await this.userUrlService.createForm_service(data)
        return this.globalMessage.create(result)
    }

    @Delete(":id")
    async deleteformDELETE_controller(@Param() id: string, @Req() req: Request) {
        const userId: number = req.user["userId"]
        const formId: number = Number(id["id"])
        const result = await this.userUrlService.deleteform_service(userId as number, formId as number)
        return this.globalMessage.ok(result)
    }
    @Patch("restore/:id")
    async restoreFormPATCH_controller(@Param() id: string, @Req() req: Request) {
        const userId: number = req.user["userId"]
        const formId: number = Number(id["id"])
        const result = await this.userUrlService.restoreForm_service(userId as number, formId as number)
        return this.globalMessage.ok(result)
    }

}

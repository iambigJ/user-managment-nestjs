import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { signupValidQueris, validQuerisForGetForm } from './dto';
import { AuthUrlsService } from './url-users-auth.service';

@Controller('api')
export class AuthUrlsController {
    constructor(private AuthUrlsService: AuthUrlsService, private globalMessage: MessagesService) { }

    /* -------------------- prefix:api/signupUser?code&userId ------------------- */
    @Get('signupUser')
    async signupFieldByCodeGET_controller(@Query() queries: { code: string, userId: string }) {
        const query: validQuerisForGetForm = {
            code: queries.code,
            userId: parseInt(queries.userId)
        }
        const result = await this.AuthUrlsService.signupFieldsByCode_service(query)
        return this.globalMessage.ok(result)
    }

    @Post('signupUser')
    async signupUserOfUrlPOST_controller(@Query() queries: { code: string, userId: string }, @Body() dto: any) {
        const data: signupValidQueris = {
            formCode: queries.code,
            userId: parseInt(queries.userId),
            signupFields: dto
        }
        const result = await this.AuthUrlsService.signupUserOfUrl_service(data)
        return this.globalMessage.ok(result)
    }

    /* -------------------- prefix:api/loginUser?code&userId -------------------- */
}

import { Body, Controller, Param, Post } from '@nestjs/common';
import { formDto } from './dto';
import * as randomSTR from "randomstring"
import { setLoginFields, seturls } from './helper';
import { createForm } from './model';
import { UserUrlsService } from './user-urls.service';
import { importDataForValidate } from './validate';

@Controller('form')
export class UserUrlsController {
    constructor(private userUrlService: UserUrlsService) { }

    @Post('new/:id')
    createFormUrl(@Param() id: string, @Body() dto: formDto) {
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
        return this.userUrlService.createUrl(data)
    }

}

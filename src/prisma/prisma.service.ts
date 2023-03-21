import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get("DATABASE_URL")
                }
            }
        })
    }
    cleanUp() {
        return this.$transaction([
            this.usersMembers.deleteMany(),
            this.url.deleteMany(),
            this.user.deleteMany()
        ])
    }
}

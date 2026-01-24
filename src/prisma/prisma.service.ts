import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(){
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL
        })
        super({ adapter, log:['error','info','query','warn'] })
    }
    async onModuleInit() {
        this.$connect()
    } 
}

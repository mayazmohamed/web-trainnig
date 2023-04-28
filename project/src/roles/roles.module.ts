import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './rolse.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([Role])

  ],

  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { UploadController } from './product/upload.controller';
import { OrdersModule } from './orders/orders.module';



@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'project',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    RolesModule,
    PermissionModule,
    ProductModule,
    OrdersModule,
  ],
  controllers: [UploadController],
})
export class AppModule {}

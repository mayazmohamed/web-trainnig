import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './rolse.entity';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getAll() {
    return this.rolesService.getAll();
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') ids: string[],
  ): Promise<Role> {
    return this.rolesService.create({
      name,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Get('/:id')
  async getRoleById(@Param() id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  async updateRoleById(
    @Param() id: string,
    @Body('name') name: string,
    @Body('permissions') ids: string[],
  ): Promise<Role> {
    await this.rolesService.update(id, { name });
    const role = await this.rolesService.findOne(id);
    return this.rolesService.create({
      ...role,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async deleteRoleById(@Param() id: string): Promise<any> {
    return this.rolesService.delete(id);
  }
}

import { AdminService } from './service/admin.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Admin } from './entity/admin.entity';
import { adminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  async registerAdmin(@Body() data: Partial<Admin>) {
    return await this.adminService.registerAdmin(data);
  }
  @Get()
  async getAdminByEmail(@Body() data: adminDto) {
    return await this.adminService.validationAdmin(data);
  }
}

import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './service/admin.service';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Admin } from './entity/admin.entity';
import { adminDto } from './dto/admin.dto';

@Controller('api/auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  async registerAdmin(@Body() data: Partial<Admin>) {
    return await this.adminService.registerAdmin(data);
  }
  @Post('/login')
  async login(@Body() data: Partial<Admin>) {
    return this.adminService.login(data);
  }
  @Get()
  async getAdminByEmail(@Body() data: adminDto) {
    return await this.adminService.validationAdmin(data);
  }
  @Delete('/del')
  @UseGuards(AuthGuard('jwt'))
  async deleteAdmin(email: string) {
    return await this.adminService.deleteAdmin(email);
  }
}

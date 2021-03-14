import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './service/admin.service';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Admin } from './entity/admin.entity';
import { adminDto } from './dto/admin.dto';

@Controller('api/auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  async register(@Body() data: Partial<Admin>) {
    return await this.adminService.register(data);
  }
  @Post('/login')
  async login(@Body() data: adminDto) {
    return this.adminService.login(data);
  }

  @Delete('/del')
  @UseGuards(AuthGuard('jwt'))
  async deleteAdmin(email: string) {
    return await this.adminService.deleteAdmin(email);
  }
}

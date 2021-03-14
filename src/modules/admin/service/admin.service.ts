import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entity/admin.entity';
import { MongoRepository } from 'typeorm';
import { adminDto } from '../dto/admin.dto';
import { secureAdminDto } from '../dto/secureAdmin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: MongoRepository<Admin>,
    private jwtService: JwtService,
  ) { }
  async register(admin: Partial<Admin>): Promise<secureAdminDto | any> {
    const payload = { email: admin.email };
    const adminresp = await this.adminRepository.findOne({
      where: { email: admin.email },
    });
    if (!adminresp) {
      const admindata = await this.adminRepository.save(new Admin(admin));
      const data = {
        email: admindata.email,
        access_token: this.jwtService.sign(payload),
      };
      return data;
    } else {
      throw new ForbiddenException();
    }
  }
  async login(admin: adminDto): Promise<secureAdminDto | any> {
    const adminresp = await this.adminRepository.findOne({
      where: { email: admin.email },
    });
    if (!adminresp) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(admin.password, adminresp.password);
    if (adminresp && isMatch) {
      const payload = { email: admin.email };
      const adminObj: secureAdminDto = {
        email: adminresp.email,
        access_token: this.jwtService.sign(payload),
      };
      return adminObj;
    }
    if (adminresp && admin.password !== adminresp.password) {
      throw new ForbiddenException();
    }
  }
  async deleteAdmin(email: string): Promise<any> {
    return this.adminRepository.delete({ email: email });
  }
}

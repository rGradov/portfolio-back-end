import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entity/admin.entity';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { adminDto } from '../dto/admin.dto';
import { secureAdminDto } from '../dto/secureAdmin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: MongoRepository<Admin>,
  ) { }
  async registerAdmin(admin: Partial<Admin>): Promise<any> {
    return this.adminRepository.save(new Admin(admin));
  }
  async validationAdmin(admin: adminDto): Promise<secureAdminDto | any> {
    const adminresp = await this.adminRepository.findOne({
      where: { email: admin.email },
    });
    if (!adminresp) {
      throw new NotFoundException();
    }
    const isMatch = await bcrypt.compare(admin.password, adminresp.password);
    if (adminresp && isMatch) {
      const adminObj: secureAdminDto = {
        email: adminresp.email,
      };
      return adminObj;
    }
    if (adminresp && admin.password !== adminresp.password) {
      throw new ForbiddenException();
    }
  }
}

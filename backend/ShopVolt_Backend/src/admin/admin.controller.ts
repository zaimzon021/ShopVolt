import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async adminLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.adminLogin(email, password);
  }

  @Post('create-admin')
  async createAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.createAdmin(name, email, password);
  }

  @Get('products')
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    return this.adminService.createProduct(productData);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.adminService.updateProduct(parseInt(id), productData);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.adminService.deleteProduct(parseInt(id));
  }
}

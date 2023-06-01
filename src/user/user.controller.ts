import {Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {UserDto} from "./user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number)
  {
    return this.userService.byId(id)
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async getNewTokens(@Body() dto:UserDto,@CurrentUser('id') id: number){
    return this.userService.updateProfile(id, dto);
  }
  @HttpCode(200)
  @Auth()
  @Post('profile/favorites/:productId')
  async toggleFavorites(
      @CurrentUser('id') id: number,
      @Param('productId') productId: string,
  ){
    return this.userService.toggleFavorite(id, +productId)
  }
}

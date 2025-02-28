import { Controller, Post, Body, Patch, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserDto, GetAuthUser } from '../../decorators/auth-user.decorator';
import { Authenticated } from '../../decorators/authenticated.decorator';
import { DeviceInfoService } from './device-info.service';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';
import { DeviceInfoResponseDto } from './response-dto/create-device-info-response.dto';

@Authenticated()
@ApiBearerAuth()
@ApiTags('Device Info')
@Controller('device-info')
export class DeviceInfoController {
  constructor(private readonly deviceInfoService: DeviceInfoService) {}

  @Post()
  async createDeviceInfo(
    @Body(ValidationPipe) createDeviceInfoDto: CreateDeviceInfoDto,
    @GetAuthUser() authUser: AuthUserDto,
  ): Promise<DeviceInfoResponseDto> {
    return this.deviceInfoService.create(createDeviceInfoDto, authUser);
  }

  @Patch()
  async updateDeviceInfo(
    @Body(ValidationPipe) updateDeviceInfoDto: UpdateDeviceInfoDto,
    @GetAuthUser() authUser: AuthUserDto,
  ): Promise<DeviceInfoResponseDto> {
    return this.deviceInfoService.update(authUser.id, updateDeviceInfoDto);
  }
}

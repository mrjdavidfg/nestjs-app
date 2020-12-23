import {
  Controller,
  Dependencies,
  Get,
  Body,
  Query,
  Post,
  Put,
  Param,
  Delete,
  Bind,
  ForbiddenException,
  UseFilters,
  ParseIntPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../common/decorators/role.decorator';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { CatsService } from './cats.service';

@Controller('cats')
@Dependencies(CatsService)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(catsService) {
    this.catsService = catsService;
  }

  @Post()
  @Bind(Body())
  async create(createCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  @Bind(Query())
  async findAll(query) {
    console.log('CatsController.findAll');
    // throw new ForbiddenException();
    return this.catsService.findAll();
  }

  @Get(':id')
  @Bind(
    Param('id', ParseIntPipe),
    Query('foo', new DefaultValuePipe(false), ParseBoolPipe),
  )
  @Roles('admin')
  findOne(id, foo) {
    console.log('Type of id:', typeof id);
    console.log({ foo });
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @Bind(Param('id'), Body())
  update(id, updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Bind(Param('id'))
  remove(id) {
    return `This action removes a #${id} cat`;
  }
}

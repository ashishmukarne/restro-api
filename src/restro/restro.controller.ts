import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RestroService } from 'src/restro/restro.service';
import { RestroDto } from './validation';

@Controller('/restros')
export class RestroController {
  constructor(private readonly service: RestroService) {}

  @Get()
  getAll(@Param('name') name, @Param('sort') sort, @Req() req) {
    name = req.query.name;
    sort = req.query.sort;
    console.log('search: ', name, sort);

    if (name && name.length > 0) {
      return this.service.search(name, sort);
    } else {
      return this.service.findAll();
    }
  }

  @Get(':id')
  retrieve(@Param('id') id) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: RestroDto, @Req() req): any {
    return this.service.create(body);
  }

  @Post('multiple')
  createMultiple(@Body() body: RestroDto[], @Req() req) {
    console.log(body);
    body.forEach(async (item: RestroDto) => {
      await this.service.create(item);
    });
    return this.service.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id): any {
    return this.service.delete(id);
  }

  @Post('delete_all')
  deleteAll(): any {
    return this.service.deleteAll();
  }
}

import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { fileMimetypeFilter } from '../utils/file-mimetype-filter';

@ApiBearerAuth()
@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: fileMimetypeFilter('image/jpg', 'image/png', 'image/jpeg'),
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.filesService.s3filesUpload(files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFile(@Query('url') url: string) {
    return this.filesService.s3filesDelete(url);
  }
}

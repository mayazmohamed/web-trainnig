import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('upload')
export class UploadController {

    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const filename = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${filename}${extname(file.originalname)}`)
            }
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `http://localhost:3000/api/${file.path}`
        }
    }


    @Get('/:path')
    async getUpload(
        @Param('path') path,
        @Res() res: Response,
    ) {
        res.sendFile(path, { root: 'upload' })
    }


}

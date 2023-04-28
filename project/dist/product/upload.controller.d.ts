/// <reference types="multer" />
import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
    getUpload(path: any, res: Response): Promise<void>;
}

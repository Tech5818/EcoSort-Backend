import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async forwordImageToAIServer(file: Express.Multer.File) {
    const formData = new FormData();

    const blobData = new Blob([file.buffer], { type: file.mimetype });

    formData.append('file', blobData);

    const response = await this.httpService.axiosRef.post(
      process.env.AI_SERVER_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }
}

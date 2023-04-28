import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async userId(req: Request): Promise<string> {
    const cookie = req.headers.authorization.split(' ')[1];

    if (!cookie) {
      return null;
    }

    try {
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        return null;
      }

      return data.id;
    } catch (e) {
      return null;
    }
  }
}

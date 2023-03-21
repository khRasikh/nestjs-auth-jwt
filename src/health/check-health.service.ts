import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckHealthService {
  checkHealth() {
    return 'OK';
  }
}

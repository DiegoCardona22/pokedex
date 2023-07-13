// @packages
import { Module } from '@nestjs/common';

// @scripts
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}

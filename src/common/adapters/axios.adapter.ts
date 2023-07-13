// @packages
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

// @scripts
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

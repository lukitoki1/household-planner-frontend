import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAppToast } from '../../components/Toast/useToast';

export interface CreateAPIProps {
  baseURL?: string;
}

export class Service {
  protected api: AxiosInstance;

  constructor(props?: CreateAPIProps) {
    this.api = this.createAPI(props);
  }

  private createAPI(
    { baseURL }: CreateAPIProps = {
      baseURL: process.env.REACT_APP_API_URL,
    },
  ): AxiosInstance {
    const instance = axios.create({
      baseURL,
      timeout: 10000,
    });

    instance.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      (error: AxiosError) => {
        const { triggerToast } = useAppToast(true);

        triggerToast({
          title: 'Błąd połączenia z serwerem',
          description: 'Podczas komunikacji z serwerem API wystąpił błąd.',
          status: 'error',
        });

        return Promise.reject(error.response);
      },
    );

    return instance;
  }
}

export type ServiceResponse<T> = Promise<T>;

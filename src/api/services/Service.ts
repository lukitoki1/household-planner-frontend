import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAppToast } from '../../components/Toast/useToast';
import FirebaseService from './FirebaseService';
import { HTTP_NOT_FOUND_STATUS } from '../../values';

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

    instance.interceptors.request.use(
      async (config) => {
        const token = await FirebaseService.getToken();
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
        return config;
      },
      (error) => {
        console.log(error);

        const { triggerToast } = useAppToast(true);
        triggerToast({
          title: 'Błąd uwierzytelniania',
          description: 'Podczas komunikacji z serwerem uwierzytelniania wystąpił błąd.',
          status: 'error',
        });
      },
    );

    instance.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      (error: AxiosError) => {
        const { triggerToast } = useAppToast(true);

        if (error.response?.status === HTTP_NOT_FOUND_STATUS) {
          triggerToast({
            title: 'Żądany zasób nie istnieje',
            description: 'Żądany zasób (np. użytkownik) nie istnieje w serwisie.',
            status: 'warning',
          });
        } else {
          triggerToast({
            title: 'Błąd połączenia z serwerem',
            description: 'Podczas komunikacji z serwerem API wystąpił błąd.',
            status: 'error',
          });
        }

        console.log(error);

        return Promise.reject(error.response);
      },
    );

    return instance;
  }
}

export type ServiceResponse<T> = Promise<T>;

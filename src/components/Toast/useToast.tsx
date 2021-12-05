import { createStandaloneToast, ToastId, useToast } from '@chakra-ui/react';
import { AlertStatus } from '@chakra-ui/alert';
import { ReactNode } from 'react';

export interface UpdateToastProps {
  title: string;
  description?: ReactNode;
  status: AlertStatus;
  isClosable?: boolean;
  isPersistent?: boolean;
}

export interface TriggerToastProps extends UpdateToastProps {
  id?: ToastId;
}

export const useAppToast = (isStandalone?: boolean) => {
  const toast = isStandalone ? createStandaloneToast() : useToast();

  const triggerToast = ({
    title,
    description,
    status,
    id,
    isClosable = true,
    isPersistent,
  }: TriggerToastProps) => {
    if (!id || !toast.isActive(id)) {
      return toast({
        id,
        title,
        description,
        status,
        isClosable,
        duration: isPersistent ? null : undefined,
        position: 'bottom-right',
      });
    }
  };

  return { toast, triggerToast };
};

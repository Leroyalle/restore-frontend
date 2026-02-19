import { useState } from 'react';
import type { ZodSchema } from 'zod';

import { mapZodError } from '@/shared/lib/validation';

export const useAuthForm = <TValues extends Record<string, string>>(
  schema: ZodSchema<TValues>,
  initialValues: TValues,
  onSubmit: (values: TValues) => Promise<unknown>,
) => {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = (field: keyof TValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log('LOGIN SUBMIT');
    const result = schema.safeParse(values);

    if (!result.success) {
      setErrors(mapZodError(result.error));
      return { ok: false };
    }

    setErrors({});
    await onSubmit(result.data);
    return { ok: true };
  };

  return { values, errors, setValue, handleSubmit };
};

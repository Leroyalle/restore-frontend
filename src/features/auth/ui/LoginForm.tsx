import type { FormEvent } from 'react'

import { useLoginForm } from '@/features/auth/model/useLoginForm'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { TextField } from '@/shared/ui/input'

export const LoginForm = () => {
  const { values, errors, setValue, handleSubmit, isPending, error } = useLoginForm()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSubmit()
  }

  return (
    <Card className="p-8">
      <h1 className="text-2xl font-semibold text-text-primary">Войти</h1>
      <p className="mt-2 text-sm text-text-muted">Добро пожаловать обратно</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          onChange={(value) => setValue('email', value)}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={values.password}
          placeholder="Введите пароль"
          autoComplete="current-password"
          error={errors.password}
          onChange={(value) => setValue('password', value)}
        />

        {error ? (
          <div className="text-sm text-red-400">Не удалось войти. Попробуйте снова.</div>
        ) : null}

        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Входим...' : 'Войти'}
        </Button>
      </form>
    </Card>
  )
}

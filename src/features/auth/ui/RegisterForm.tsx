import type { FormEvent } from 'react'

import { useRegisterForm } from '@/features/auth/model/useRegisterForm'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { TextField } from '@/shared/ui/input'

export const RegisterForm = () => {
  const { values, errors, setValue, handleSubmit, isPending, error } = useRegisterForm()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSubmit()
  }

  return (
    <Card className="p-8">
      <h1 className="text-2xl font-semibold text-text-primary">Регистрация</h1>
      <p className="mt-2 text-sm text-text-muted">Создайте аккаунт за минуту</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <TextField
          label="Имя"
          name="name"
          value={values.name}
          placeholder="Ваше имя"
          autoComplete="name"
          error={errors.name}
          onChange={(value) => setValue('name', value)}
        />
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
          placeholder="Придумайте пароль"
          autoComplete="new-password"
          error={errors.password}
          onChange={(value) => setValue('password', value)}
        />

        {error ? (
          <div className="text-sm text-red-400">Не удалось зарегистрироваться.</div>
        ) : null}

        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Создаём...' : 'Создать аккаунт'}
        </Button>
      </form>
    </Card>
  )
}

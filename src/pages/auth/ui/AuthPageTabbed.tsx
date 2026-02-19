import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/features/auth/model/mutations/useLoginMutation';
import { useRegisterMutation } from '@/features/auth/model/mutations/useRegisterMutation';
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from '@/features/auth/model/schema';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';
import { TextField } from '@/shared/ui/input';
import { mapZodError } from '@/shared/lib/validation';

type TabType = 'login' | 'register';

const initialLoginValues: LoginFormValues = {
  email: '',
  password: '',
};

const initialRegisterValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const AuthPageTabbed = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerValues, setRegisterValues] = useState(initialRegisterValues);
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const navigation = useNavigate();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginSchema.safeParse(loginValues);

    if (!result.success) {
      setLoginErrors(mapZodError(result.error));
      return;
    }

    setLoginErrors({});
    await loginMutation.mutateAsync(result.data);
    await navigation('/');
  };

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = registerSchema.safeParse(registerValues);

    if (!result.success) {
      setRegisterErrors(mapZodError(result.error));
      return;
    }

    setRegisterErrors({});
    await registerMutation.mutateAsync(result.data);
  };

  const setLoginValue = (field: keyof LoginFormValues, value: string) => {
    setLoginValues(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (loginErrors[field]) {
      setLoginErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const setRegisterValue = (field: keyof RegisterFormValues, value: string) => {
    setRegisterValues(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (registerErrors[field]) {
      setRegisterErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary flex flex-col">
      <Container className="py-4 border-b border-stroke-500">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-brand-300 group-hover:bg-brand-500/30 transition">
              <span className="text-sm font-semibold">R</span>
            </div>
            <span className="text-sm font-semibold tracking-wide group-hover:text-brand-300 transition">
              RESTART
            </span>
          </Link>
          <Link
            to="/"
            className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-stroke-500/20 transition">
            ← Вернуться
          </Link>
        </div>
      </Container>
      <Container className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[480px]">
          <Card className="p-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-stroke-500">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 text-center font-medium transition-all ${
                  activeTab === 'login'
                    ? 'border-b-2 border-brand-400 text-brand-400 bg-ink-850/30'
                    : 'text-text-muted hover:text-text-secondary'
                }`}>
                Вход
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 text-center font-medium transition-all ${
                  activeTab === 'register'
                    ? 'border-b-2 border-brand-400 text-brand-400 bg-ink-850/30'
                    : 'text-text-muted hover:text-text-secondary'
                }`}>
                Регистрация
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {activeTab === 'login' && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">Войти</h2>
                  <p className="mt-2 text-sm sm:text-base text-text-muted">
                    Добро пожаловать обратно
                  </p>

                  <form className="mt-6 sm:mt-8 space-y-4" onSubmit={handleLoginSubmit}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={loginValues.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={loginErrors.email}
                      onChange={value => setLoginValue('email', value)}
                    />
                    <TextField
                      label="Пароль"
                      name="password"
                      type="password"
                      value={loginValues.password}
                      placeholder="Введите пароль"
                      autoComplete="current-password"
                      error={loginErrors.password}
                      onChange={value => setLoginValue('password', value)}
                    />

                    {loginMutation.error ? (
                      <div className="text-sm text-red-400 bg-red-400/10 rounded-lg p-3">
                        Не удалось войти. Попробуйте снова.
                      </div>
                    ) : null}

                    <Button className="w-full mt-6" disabled={loginMutation.isPending}>
                      {loginMutation.isPending ? 'Входим...' : 'Войти'}
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'register' && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                    Регистрация
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-text-muted">
                    Создайте аккаунт за минуту
                  </p>

                  <form className="mt-6 sm:mt-8 space-y-4" onSubmit={handleRegisterSubmit}>
                    <TextField
                      label="Имя"
                      name="name"
                      type="text"
                      value={registerValues.name}
                      placeholder="Ваше имя"
                      autoComplete="name"
                      error={registerErrors.name}
                      onChange={value => setRegisterValue('name', value)}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={registerValues.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={registerErrors.email}
                      onChange={value => setRegisterValue('email', value)}
                    />
                    <TextField
                      label="Пароль"
                      name="password"
                      type="password"
                      value={registerValues.password}
                      placeholder="Придумайте пароль"
                      autoComplete="new-password"
                      error={registerErrors.password}
                      onChange={value => setRegisterValue('password', value)}
                    />
                    <TextField
                      label="Подтвердить пароль"
                      name="confirmPassword"
                      type="password"
                      value={registerValues.confirmPassword}
                      placeholder="Повторите пароль"
                      autoComplete="new-password"
                      error={registerErrors.confirmPassword}
                      onChange={value => setRegisterValue('confirmPassword', value)}
                    />

                    {registerMutation.error ? (
                      <div className="text-sm text-red-400 bg-red-400/10 rounded-lg p-3">
                        Не удалось зарегистрироваться.
                      </div>
                    ) : null}

                    <Button className="w-full mt-6" disabled={registerMutation.isPending}>
                      {registerMutation.isPending ? 'Создаём...' : 'Создать аккаунт'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </Card>

          {/* Footer text - optional */}
          <p className="mt-6 text-center text-xs sm:text-sm text-text-muted">
            Защищено безопасным подключением
          </p>
        </div>
      </Container>
    </div>
  );
};

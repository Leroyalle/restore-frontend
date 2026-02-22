import { Link } from 'react-router-dom';

import { LoginForm, RegisterForm } from '@/features/auth';
import { Container } from '@/shared/ui/container';

type AuthPageProps = {
  mode: 'login' | 'register';
};

const content = {
  login: {
    Form: LoginForm,
    linkText: 'Нет аккаунта?',
    linkLabel: 'Зарегистрироваться',
    linkTo: '/auth/register',
  },
  register: {
    Form: RegisterForm,
    linkText: 'Уже есть аккаунт?',
    linkLabel: 'Войти',
    linkTo: '/auth/login',
  },
} as const;

export const AuthPage = ({ mode }: AuthPageProps) => {
  const { Form, linkLabel, linkText, linkTo } = content[mode];

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <Container className="py-16">
        <div className="mx-auto w-full max-w-[420px]">
          <Form />
          <p className="mt-4 text-center text-sm text-text-muted">
            {linkText}{' '}
            <Link className="text-brand-300 hover:text-brand-400" to={linkTo}>
              {linkLabel}
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

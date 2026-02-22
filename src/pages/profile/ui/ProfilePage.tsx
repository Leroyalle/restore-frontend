import { Link } from 'react-router-dom';

import { useGetMe } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};

const getInitial = (name: string) => {
  return name.trim().charAt(0).toUpperCase() || 'U';
};

const shortenId = (id: string) => {
  return `${id.slice(0, 8)}...${id.slice(-6)}`;
};

export const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMe();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink-950 text-text-primary">
        <Header />
        <Container className="py-10 sm:py-14">
          <div className="grid gap-6">
            <Card className="overflow-hidden p-0">
              <div className="h-40 bg-gradient-to-r from-brand-500/30 via-brand-400/15 to-transparent" />
              <div className="space-y-4 p-6 sm:p-8">
                <div className="h-16 w-16 rounded-2xl bg-white/10" />
                <div className="h-6 w-44 rounded bg-white/10" />
                <div className="h-4 w-64 rounded bg-white/10" />
              </div>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-ink-950 text-text-primary">
        <Header />
        <Container className="py-20">
          <Card className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-semibold">Profile unavailable</h1>
            <p className="mt-3 text-text-secondary">
              We could not load your account. Please sign in again.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/auth">
                <Button>Sign in</Button>
              </Link>
              <Link to="/">
                <Button variant="ghost">Back to home</Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  const userStatus = data.emailVerifiedAt ? 'Verified account' : 'Email not verified';
  const userStatusClass = data.emailVerifiedAt
    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
    : 'border-amber-400/40 bg-amber-400/10 text-amber-300';

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <Header />

      <Container className="pb-14 sm:pb-20 mt-4">
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="relative overflow-hidden border-brand-400/30 p-0 xl:col-span-2">
            <div className="h-36 bg-[radial-gradient(110%_160%_at_15%_20%,rgba(123,97,255,0.5),rgba(123,97,255,0.05),transparent_75%)]" />
            <div className="relative -mt-8 space-y-5 px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-300/40 bg-ink-900 text-2xl font-semibold text-brand-300 shadow-soft">
                {getInitial(data.name)}
              </div>

              <div>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{data.name}</h1>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">{data.email}</p>
              </div>

              <span
                className={[
                  'inline-flex rounded-full border px-3 py-1 text-xs font-semibold',
                  userStatusClass,
                ].join(' ')}>
                {userStatus}
              </span>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Account details</h2>
            <DetailRow label="Member since" value={formatDate(data.createdAt)} />
            <DetailRow label="Last updated" value={formatDate(data.updatedAt)} />
            <DetailRow label="User ID" value={shortenId(data.id)} />
          </Card>
        </div>
      </Container>
    </div>
  );
};

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="rounded-2xl border border-stroke-500 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
};

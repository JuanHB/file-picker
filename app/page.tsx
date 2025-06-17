import { AuthButton } from '@/components/features/auth';

export default function App() {
  return (
    <div
      className={
        'flex flex-wrap items-center gap-2 md:flex-row justify-center h-screen'
      }
    >
      <AuthButton />
    </div>
  );
}

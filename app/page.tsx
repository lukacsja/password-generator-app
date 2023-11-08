import PasswordGenerator from '@/components/password-generator';

export default function Home() {
  return (
    <main className='bg-gray-darkest flex min-h-screen w-full items-center justify-center p-4 md:p-32'>
      <PasswordGenerator />
    </main>
  );
}

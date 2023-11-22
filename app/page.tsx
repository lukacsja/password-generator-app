import PasswordGenerator from '@/components/password-generator';

export default function Home() {
  return (
    <div className='flex min-h-screen w-full items-start justify-center bg-gray-darkest px-4 py-16 md:py-[96px]'>
      <PasswordGenerator />
    </div>
  );
}

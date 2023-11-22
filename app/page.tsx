import PasswordGenerator from '@/components/password-generator';

export default function Home() {
  return (
    <div className='flex min-h-screen w-full items-start justify-center bg-[#08070b] px-4 py-16 md:py-[133px]'>
      <PasswordGenerator />
    </div>
  );
}

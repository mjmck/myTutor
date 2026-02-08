import AuthButton from './AuthButton';

type NavBarProps = {
  title?: string;
  subtitle?: string;
};

export default function NavBar({ title = 'myTutor' }: NavBarProps) {
  return (
    <nav className="shrink-0 w-full px-6 py-4 bg-gradient-to-r from-[#6b21a8] via-[#7c3aed] to-[#be123c] shadow-lg flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight font-sans drop-shadow-sm">
          {title}
        </h1>
      </div>
      <AuthButton />
    </nav>
  );
}

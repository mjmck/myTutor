'use client';

import { useAuth } from '@/app/context/AuthContext';

export default function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="rounded-xl px-4 py-2 text-sm text-white/60 animate-pulse">
        Loading…
      </div>
    );
  }

  if (user) {
    const displayName = user.user_metadata?.user_name ?? user.user_metadata?.full_name ?? user.email ?? 'Account';
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/90 truncate max-w-[140px]" title={displayName}>
          {displayName}
        </span>
        <button
          onClick={signOut}
          className="rounded-xl px-4 py-2 text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="rounded-xl px-4 py-2 text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
    >
      Sign in with GitHub
    </button>
  );
}

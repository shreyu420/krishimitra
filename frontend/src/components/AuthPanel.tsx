import { FormEvent, useState } from 'react';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthPanel = () => {
  const { user, login, signup, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'signup') {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="hidden sm:inline text-primary-foreground/90">{user.name}</span>
        <button onClick={logout} className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 flex items-center gap-1">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="hidden md:flex items-center gap-1.5 text-xs">
      {mode === 'signup' && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 w-24"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 w-28"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 w-24"
      />
      <button className="bg-primary-foreground/10 border border-primary-foreground/30 rounded px-2 py-1 flex items-center gap-1" type="submit">
        {mode === 'signup' ? <UserPlus className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}
        {mode === 'signup' ? 'Sign up' : 'Login'}
      </button>
      <button
        type="button"
        className="underline"
        onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))}
      >
        {mode === 'login' ? 'Create account' : 'Have account?'}
      </button>
      {error && <span className="text-red-200">{error}</span>}
    </form>
  );
};

export default AuthPanel;

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: 'var(--color-washi)' }}
    >
      <div
        className="mx-auto relative min-h-screen flex flex-col"
        style={{ maxWidth: '720px' }}
      >
        {children}
      </div>
    </div>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: 'var(--color-washi)',
        minHeight: '100dvh',
      }}
    >
      <div
        className="mx-auto relative flex flex-col"
        style={{ maxWidth: '720px', minHeight: '100dvh' }}
      >
        {children}
      </div>
    </div>
  );
}

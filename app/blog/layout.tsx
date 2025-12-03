import RedirectToHome from '../components/RedirectToHome';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RedirectToHome />
      {children}
    </>
  );
}


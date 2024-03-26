import Link from 'next/link';

const navItems = {
  '/': {
    name: 'Home',
  },
  '/projects': {
    name: 'Projects',
  },
  '/blog': {
    name: 'Blog',
  },
  '/hire': {
    name: 'Hire me',
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight ">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-col items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-col space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 hover:font-semibold dark:hover:text-neutral-200 flex align-middle relative py-1 px-2  w-24"
                >
                  {name}
                </Link>
              );
            })}

          <Link href="/resume.pdf" download="Resume" className="transition-all hover:text-neutral-800 hover:font-semibold dark:hover:text-neutral-200 flex align-middle relative py-1 px-2  w-24">Resume</Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}

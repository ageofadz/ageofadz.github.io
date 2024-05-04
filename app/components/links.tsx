
import Image from "next/image";

export function Links() {
    return (

      <aside className="-mr-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-col relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        >
<a href='https://www.github.com/ageofadz'
className="transition-all hover:dark:bg-neutral-700 hover:bg-neutral-200 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-600 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3"
>
<Image width={40} height={40}alt="GitHub logo" src="/github-logo.svg"/>
</a>
<a href='https://www.linkedin.com/in/sam-r-559bb090/'
className="transition-all hover:dark:bg-neutral-700 hover:bg-neutral-200 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-600 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
>
<Image width={40} height={40}alt="LinkedIn logo" src="/linkedin-logo.svg" />
</a>
<a  href='mailto:samuel.lazier.robertson+website@gmail.com'
className="transition-all hover:dark:bg-neutral-700 hover:bg-neutral-200 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-600 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
>
<Image width={40} height={40}alt="Email" src="/email.svg"/>

</a>
        </nav>
      </div>
    </aside>


)
}

import Image from "next/image";

export default function Page() {
  return (
    <section>
      <div className='flex flex-row justify-between'>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Sam Robertson</h1>
      <Image width={800} height={800}src='/portrait.png' className='rounded-full w-20 h-20 justify-right' alt='portrait' />
      </div>
      <p className="prose prose-neutral dark:prose-invert">
        I am a developer and ESL teacher from Chicago living in Hồ Chí Minh City, Vietnam. I am the creator of <a href='https://grifgraf.app'>grifgraf</a> and <a href='https://planmi.vercel.app'>planmi</a>.
        <br />
        <br />
        I am open to hire for freelance and contract engineering roles.
        <br />
        <br />
        You can keep up to date with my work on my blog, or reach me directly using the links on the sidebar.
      </p>
    </section>
  );
}

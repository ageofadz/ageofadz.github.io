import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from './view-counter';
import { getViewsCount } from '../db/queries';
import { getBlogPosts } from '../db/blog';
import Image from "next/image";

export const metadata = {
  title: 'Blog',
  description: 'Information about my projects',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section className=" bg-white text-black">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Latest posts
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-row my-3 bg-white">
              <div className="flex flex-row w-full">
              <p className="text-neutral-900 tracking-tight float-left">
                {post.metadata.title}
              </p>
              </div>
              <div className="w-full flex justify-end">
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={post.slug} />
              </Suspense>
              <Image width={800} height={800}src={post.metadata.image ?? ''} className='rounded-full w-12 h-12 float-right' alt={post.metadata.image ?? ''} />
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }) {
  let views = await getViewsCount();

  return <ViewCounter allViews={views} slug={slug} />;
}

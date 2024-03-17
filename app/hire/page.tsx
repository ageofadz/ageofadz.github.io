import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './buttons';
import { Suspense } from 'react';
import Form from './form';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
  return (
    <section>
    <div className='flex flex-row justify-between'>
    <h1 className="font-medium text-2xl mb-8 tracking-tighter">Why Sam?</h1>
    <img src='./portrait.png' className='rounded-full w-20 h-20 justify-right' />
    </div>

      <ul className='my-5'>
      <li className='my-5'>
      ✅ Years of professional experience as a developer working for American companies.
      </li>
      <li className='my-5'>
      ✅ Strong reputation for delivering quality work on a variety of software projects.
      </li>
      <li className='my-5'>
      ✅ Native English speaker.
      </li>
      <li className='my-5'>
      ✅ Competitive monthly rate.
      </li>
      <li className='my-5'>
      ✅ Flexible contract terms to meet your development needs.
      </li>
      </ul>
    </section>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 dark:text-neutral-400 mr-1">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}

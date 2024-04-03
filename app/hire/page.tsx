import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './buttons';

export const metadata = {
  title: 'Hire me',
  description: 'Information about hiring me.',
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
      Send me an <a href='mailto:samuel.lazier.robertson+website@gmail.com'>email</a> for more details.
    </section>
  );
}
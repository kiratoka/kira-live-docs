
import Header from '@/components/Header'
import Homepage from '@/components/Home/Homepage';
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  const userId = clerkUser.id
  const email = clerkUser.emailAddresses[0].emailAddress
  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main >
      <Homepage roomDocuments={roomDocuments} email={email} userId={userId}/>
    </main>

  )
}

export default Home
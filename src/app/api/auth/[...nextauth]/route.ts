import { AuthOptions } from '@/app/lib/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };

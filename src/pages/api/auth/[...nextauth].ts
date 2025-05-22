import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../../../lib/supabaseClient';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('認証リクエスト:', credentials);
        const { email, password } = credentials!;
        const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !user) {
          console.log('Supabase認証エラー:', error);
          return null;
        }
        const { data, error: userError } = await supabase
          .from('users')
          .select('id, name, email, role')
          .eq('id', user.id)
          .single();
        if (userError || !data) {
          console.log('ユーザーデータ取得エラー:', userError);
          return null;
        }
        return data;
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
}); 
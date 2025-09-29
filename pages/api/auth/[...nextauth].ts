import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.NEXT_TWITTER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_TWITTER_CLIENT_SECRET as string,
      version: "2.0", // 使用 OAuth 2.0
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
            token.username = (profile as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).username = token.username;
      return session;
    },
  },
});
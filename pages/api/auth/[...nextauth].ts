import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.NEXT_TWITTER_CLIENT_ID,
      clientSecret: process.env.NEXT_TWITTER_CLIENT_SECRET,
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
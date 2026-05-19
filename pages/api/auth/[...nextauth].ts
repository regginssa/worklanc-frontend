import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // first login only
      if (account && profile) {
        token.googleId = profile.sub;
        token.firstName = profile.given_name;
        token.lastName = profile.family_name;
        token.picture = profile.picture;
        token.emailVerified = profile.email_verified;
        token.locale = profile.locale;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.googleId = token.googleId;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.picture = token.picture;
      session.user.emailVerified = token.emailVerified;
      session.user.locale = token.locale;

      return session;
    },
  },
});

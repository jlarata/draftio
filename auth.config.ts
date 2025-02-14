import { request } from 'http';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user?.name
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnSwiss = nextUrl.pathname.startsWith('/swiss');
            if (isOnDashboard) {
                if (isLoggedIn) {
                    //console.log("User: " + auth?.user?.id);
                    return true;
                }                    
                return false; //redirige usuarios no autenticados a la login page
            } else if (isOnSwiss) {
                if (isLoggedIn) {
                    //console.log("User: " + auth?.user?.name)
                }
                else console.log("No user");
            }
            /* else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
                //cambié la redireccion a /
            } */
            return true;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
              ...session.user,
              id: token.sub,
            },
          }),
    },
    providers: [],
} satisfies NextAuthConfig;

//export { authConfig as GET, authConfig as POST };
//https://stackoverflow.com/questions/78150816/sessions-user-id-not-present
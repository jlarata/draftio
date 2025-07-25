import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { NormalizedUser, User } from "@/services/lib/definitions";
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<NormalizedUser | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM p_user WHERE email=${email}`;
        //console.log("acá la query", user)
        const normUser: NormalizedUser = {
            id : user[0].player_id,
            name : user[0].name,
            email : user[0].email,
            password : user[0].password,
        }
        return normUser;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const {email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    /* console.log("de la query sale ", user) */
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                console.log('Invalid credentials')

                return null;
            },
        }),
    ],
})


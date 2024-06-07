import NextAuth,{NextAuthConfig} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const authConfig : NextAuthConfig ={
    providers: [
        CredentialProvider({
            credentials: {},
            async authorize(credentails, request){
             const {email,password} = credentails as {
                email: string;
                password: string;
                };

                if(email === 'admin@gmail.com' && password == '123'){
                    return {email, id:'123', name:'Admin'}
                    }

                    return null;
            },
        })
    ]
}

export const {
    auth,
    handlers :{GET, POST}, 
} = NextAuth(authConfig)
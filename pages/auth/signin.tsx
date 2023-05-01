import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import SignInPage from "@/components/User/SignInPage";

import { getProviders, getCsrfToken, getSession } from "next-auth/react";

const SignIn = ({ providers, csrfToken, callbackUrl }: any) => {
    providers = Object.values(providers);
    
    return ( 
        <>
            <Header />
                <main className="bg-slate-100 w-full h-auto">
                    <SignInPage providers={providers} csrfToken={csrfToken} callbackUrl={callbackUrl}/>
                </main>
            <Footer />
            <MenuSideBar />
        </>
     );
}
 
export default SignIn;



export const getServerSideProps = async (context: any) => {
    const { req, query } = context;
    const { callbackUrl = null } = query || null;
    // console.log('call:',callbackUrl, query, context)

    const session = await getSession({req});

    if(session) {
        return {
            redirect: {
                destination: callbackUrl
            }
        }
    }
    const csrfToken = await getCsrfToken(context);
    const providers = await getProviders();

    return{
        props: {
            providers,
            csrfToken,
            callbackUrl
        }
    }
}
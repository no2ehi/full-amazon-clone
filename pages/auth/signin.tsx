import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import SignInPage from "@/components/User/SignInPage";

import { getProviders } from "next-auth/react";

const SignIn = ({providers}: any) => {

    return ( 
        <>
            <Header />
                <main className="bg-slate-100 w-full h-auto">
                    <SignInPage providers={providers}/>
                </main>
            <Footer />
            <MenuSideBar />
        </>
     );
}
 
export default SignIn;

export const getServerSideProps = async (context: any) => {
    const providers = Object.values(await getProviders());

    return{
        props: {
            providers
        }
    }
}
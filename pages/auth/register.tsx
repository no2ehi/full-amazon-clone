import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import RegisterPage from "@/components/User/RegisterPage";

import { getProviders } from "next-auth/react";

const Register = ({providers}: any) => {

    return ( 
        <>
            <Header />
                <main className="bg-slate-100 w-full h-auto">
                    <RegisterPage providers={providers}/>
                </main>
            <Footer />
            <MenuSideBar />
        </>
     );
}
 
export default Register;

export const getServerSideProps = async (context: any) => {
    const providers = Object.values(await getProviders());

    return{
        props: {
            providers
        }
    }
}
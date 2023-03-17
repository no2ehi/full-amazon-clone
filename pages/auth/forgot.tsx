import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ForgotPage from "@/components/User/ForgotPage";

const Forgot = () => {
    return ( 
        <>
            <Header />
                <main className="bg-slate-100 w-full h-auto">
                    <ForgotPage />
                </main>
            <Footer />
            <MenuSideBar />
        </>
     );
}
 
export default Forgot;
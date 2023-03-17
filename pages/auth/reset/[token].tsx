import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ResetPage from "@/components/User/ResetPage";
import jwt from "jsonwebtoken";
import { getSession } from "next-auth/react";

const Reset = ({ userId }: any) => {
    return (
        <>
            <Header />
            <main className="bg-slate-100 w-full h-auto">
                <ResetPage userId={userId} />
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
};

export default Reset;

export const getServerSideProps = async (context: any) => {
    const { query, req } = context;

    const session = await getSession({ req });
    console.log('req : ', req)
    if(session) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    const token = query.token;
    const user_id = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

    return {
        props: {
            userId: user_id.id,
        },
    };
};

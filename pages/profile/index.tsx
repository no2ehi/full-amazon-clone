import Layout from "@/components/profile/layout";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const Profile = ({user, tab}: any) => {
    return (
        <>
            <Layout user={user} tab={tab}>
                hello
            </Layout>
        </>
    );
};

export default Profile;

export async function getServerSideProps(context: any) {
    db.connectDb();
    const { query } = context;
    const session = await getSession(context);
    const user = session?.user;
    const tab = query.tab || 0;
    

    return {
        props: {
            user,
            tab
        }
    }
}

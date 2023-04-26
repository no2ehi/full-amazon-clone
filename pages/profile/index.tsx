import Layout from "@/components/profile/layout/Layout";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const Profile = ({ user, tab, orders }: any) => {
    return (
        <>
            <Layout user={user} tab={tab} title={`${user.name}'s Profile`}>
            <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">My Profile</h2>
            </div>
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

    if (!session) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }

    return {
        props: {
            user,
            tab,
        },
    };
}

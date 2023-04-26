import Header from "@/components/Header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ user, tab, title, children }: any) => {
    // console.log(session);
    return (
        <>
            <Header title={title} />
            <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-4 md:px-14 pt-5 pb-8 gap-8">
                <section className="col-span-1 bg-white p-2 md:p-5 rounded-xl border">
                    <Sidebar data={{
                        ...user,
                        tab
                    }} />
                </section>
                <section className="col-span-3 bg-white p-2 md:p-5 rounded-xl border">
                    {children}
                </section>
            </main>
        </>
    );
};

export default Layout;

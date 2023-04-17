import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: any) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full md:pl-8 ">{children}</div>
        </div>
    );
};

export default Layout;

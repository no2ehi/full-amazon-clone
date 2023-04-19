import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import CartPage from "@/components/CartPage/CartPage";
import Empty from "@/components/CartPage/Empty";

const Cart = () => {
    const cart = [];
    return (
        <>
            <Header />
            <main className="w-full h-screen">
                {cart.length > 0 ? (
                    <>
                        <CartPage />
                        <MenuSideBar />
                    </>
                ) : (
                    <Empty />
                )}
            </main>
        </>
    );
};

export default Cart;

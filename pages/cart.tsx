import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import CartPage from "@/components/CartPage/CartPage";
import Empty from "@/components/CartPage/Empty";
import { useAppSelector } from "@/redux/hooks";

const Cart = () => {
    const { cart } = useAppSelector((state: any) => ({ ...state }));
    // console.log('cart > ', cart);
    return (
        <>
            <Header />
            <main className="w-full h-screen">
                {cart.cartItems.length > 0 ? (
                    <CartPage cart={cart}/>
                ) : (
                    <Empty />
                )}
            </main>
            <MenuSideBar />
        </>
    );
};

export default Cart;

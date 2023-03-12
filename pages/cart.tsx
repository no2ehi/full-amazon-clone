import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import CartPage from "@/components/CartPage/CartPage";

const Cart = () => {
    return ( 
        <>
            <Header />
            <main className="bg-slate-100 w-full h-screen">
                <CartPage />
            </main>
            <MenuSideBar />
        </>
     );
}
 
export default Cart;
import Payment from "@/components/order/Payment";
import Header from "@/components/Header/Header";
import OrderInfo from "@/components/order/OrderInfo";
import Product from "@/components/order/Product";
import Total from "@/components/order/Total";
import UserInfo from "@/components/order/UserInfo";
import Order from "../../models/Order";

const OrderPage = ({ order }: any) => {
    console.log(order);
    return (
        <>
            <Header title="Full Amazon Clone React" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-3 md:px-10 pt-5 pb-8 gap-8">
                <section className="col-span-2 bg-white p-2 md:p-5 rounded-xl border">
                    <OrderInfo order={order} />

                    {order.products.map((product: any) => (
                        <Product key={product.name} product={product} />
                    ))}

                    <Total order={order} />
                </section>
                <section className="md:col-span-1 h-fit bg-white p-2 md:p-5 rounded-xl border">
                    <UserInfo order={order} />
                    <Payment order={order} />
                </section>
            </main>
        </>
    );
};

export default OrderPage;

export async function getServerSideProps(context: any) {
    const { query } = context;
    const id = query.id;
    const order = await Order.findById(id).populate("user").lean();

    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        },
    };
}

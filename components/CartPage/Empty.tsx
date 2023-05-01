import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Empty = () => {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col items-center space-y-4 bg-white rounded mt-6 py-6 mx-4 border">
            <ShoppingBagIcon className="w-20 h-20" />
            <h1 className="font-bold text-3xl">Cart is Empty</h1>
            <Link href="/browse">
                <button className="flex items-center justify-center bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark  p-2 rounded-full space-x-2 hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 w-52 font-semibold">
                    SHOP NOW
                </button>
            </Link>
            {!session ? (
                <button onClick={() => signIn()} className="flex items-center justify-center  p-2 rounded-full space-x-2 bg-amazon-blue_light text-slate-100 transition duration-500 ease-in-out w-52 font-semibold">
                    Sign In / Register
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Empty;

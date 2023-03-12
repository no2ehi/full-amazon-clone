import { ChevronRightIcon, LockClosedIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const Product = ({ product }: any) => {
    const {
        id,
        title,
        description,
        price,
        discountPercentage,
        category,
        brand,
        images,
        rating,
        stock,
        thumbnail,
    } = product;
   
    return (
        <div className="w-full bg-white h-auto px-3 mb-6 md:p-4">

            {/* BreadCrumb */}
            <div className="flex text-sm text-gray-600 items-center mx-2 my-4">
                <Link className="hover:underline" href="/">Home</Link>
                <ChevronRightIcon className="h-3 mx-1" />
                <Link className="hover:underline" href={`/category/${category}`}>{category}</Link>
            </div>

            <div className="grid grid-row-8 md:grid-cols-8 gap-4">

                <div className="flex flex-col-reverse md:flex-row row-span-3 md:col-span-3 space-x-2">
                    <div className="flex md:flex-col max-md:mt-2">
                        {images.map((src: string) => (
                            <div key={src} className="relative w-16 h-16 max-md:mr-1 md:mb-2 border border-gray-700">
                                <Image src={src} alt={title} fill className="object-contained"/>
                            </div>
                        ))}
                    </div>
                    <div className="flex-grow relative h-96">
                        <Image src={thumbnail} alt={title} fill className="object-contained" />
                    </div>
                </div>

                <div className="flex flex-col space-y-3 row-span-3 md:col-span-3 max-md:px-2">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    
                    <div className="flex">
                        {Array(Math.floor(rating))
                            .fill('')
                            .map((_, i) => (
                                <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                    </div>

                    <div className="flex w-full bg-slate-200 h-0.5" />

                    <div className="text-lg font-semibold">
                        ${price}
                    </div>

                    <table className="my-4">
                        <tbody>
                            <tr>
                                <td>Brand</td>
                                <td>{brand}</td>
                            </tr>
                            <tr>
                                <td>Stock</td>
                                <td>{stock}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{category}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex flex-col">
                        <h4 className="font-bold mb-1">About This item</h4>
                        <p className="text-sm">{description}. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit minus atque, in tenetur asperiores blanditiis odio doloremque reprehenderit quo sequi, eius porro delectus consequuntur aliquid dolorem nam ex consequatur nemo.</p>
                    </div>

                </div>

                <div className="rounded-lg border border-gray-300 p-3 flex flex-col row-span-2 md:col-span-2">
                    <div className="mb-3 font-semibold">${price}</div>

                    <div className="text-slate-600 text-sm">
                        <p>No Import Fees Deposit & $9.00</p>
                        <div className="flex">
                            <p>Shipping to Germany</p>
                            <div className="ml-2 flex items-center text-blue-500 cursor-pointer hover:text-amazon-orange">
                                Details
                                <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </div>

                    <div>
                    <p>Delivery <b>Thursday, March 23</b>. Order within <span className="text-green-500">23 hrs 53 mins</span></p>
                    </div>

                    <div className="flex items-center my-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <p className="text-sm text-blue-500 cursor-pointer hover:text-amazon-orange">Deliver to Germany</p>
                    </div>

                    <div className="my-2">
                        <p className="font-md font-semibold text-green-700">
                            {stock > 1 ? 'In Stock' : 'Sold'}
                        </p>
                    </div>

                    <button className="py-2 px-4 bg-amazon-orange text-black rounded-full shadow">Add to Cart</button>

                    <div className="flex items-center mt-4 cursor-pointer">
                        <LockClosedIcon className="h-4 mr-1" />
                        <p className="text-blue-600 hover:text-amazon-orange">Secure transaction</p>
                    </div>

                    <table className="my-4 text-sm whitespace-nowrap grid">
                        <tbody>
                            <tr  className="grid grid-cols-3">
                                <td className="text-slate-500">Ships from</td>
                                <td className="col-span-2">Amazon</td>
                            </tr>
                            <tr className="grid grid-cols-3">
                                <td className="text-slate-500">Sold by</td>
                                <td className="col-span-2">ATUAT</td>
                            </tr>
                            <tr className="grid grid-cols-3">
                                <td className="text-slate-500">Returns</td>
                                <td className="col-span-2 truncate">Eligible for Return, Refund or Replacement within 30 days of receipt</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex w-full bg-slate-200 h-0.5" />

                    <div>
                        add to list
                    </div>

                </div>


            </div>

            
            
        </div>
    );
};

export default Product;

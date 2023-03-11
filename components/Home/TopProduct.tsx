import Image from "next/image";

const TopProduct = ({ products, categories, title }: any) => {
    const randomIndexCategory = Math.floor(Math.random() * 10) + 1;
    const selectedProduct = products.filter((product: any) => product.category === categories[randomIndexCategory])

    return ( 
        <div className="flex flex-col  rounded bg-white h-72 mx-4 mb-4 p-4 border">
            <h4 className="font-bold text-xl mb-4">{title} {categories[randomIndexCategory]}</h4>
            <div className="flex">
                {selectedProduct.map((product: any) => (
                    <div className="relative w-52 h-52 mx-2" key={product.id}>
                        <Image src={product.thumbnail} alt={product.title} fill />
                    </div>
                ))}
                {selectedProduct.map((product: any) => (
                    <div className="relative w-52 h-52 mx-2" key={product.id}>
                        <Image src={product.thumbnail} alt={product.title} fill />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TopProduct;
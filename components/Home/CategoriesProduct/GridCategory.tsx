import Image from "next/image";

const GridCategory = ({indexCategory, products, gridCols}: any) => {
    const length = gridCols * gridCols;
    const selectedProducts = products.filter( (product: any) => ( indexCategory === product.category)).slice(0, length);

    return ( 
        <div className="flex flex-col bg-white border rounded p-2">
                <h3 className="font-bold my-2 uppercase">{indexCategory}</h3>
                <div className={`grid grid-cols-${gridCols} gap-4 m-1`}>
                
                {selectedProducts.map((product: any) => (
                    <div key={product.id}>
                        <div className={`relative ${length > 1 ? 'h-24' : 'h-[230px]'}`}>
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                className="object-cover rounded"
                            />  
                        </div>
                        {length > 1 && (<h4 className="text-xs mt-1">{product.title}</h4>)}
                    </div>
                ))}

                {length > 1 ? (
                    <h4 className="text-xs cursor-pointer hover:underline text-blue-500">See more</h4>
                ) : (
                    <h4 className="text-xs cursor-pointer hover:underline text-blue-500 mt-5">Shop now</h4>
                )}

                </div>
        </div>
     );
}
 
export default GridCategory;
import Link from "next/link";
import {
    ChevronRightIcon,

} from "@heroicons/react/24/outline";

const BreadCrumb = ({category, subCategories}: any) => {
    return ( 
        <div className="flex text-sm text-gray-600 items-center mx-2 my-4">
        <Link className="hover:underline" href="/">
            Home
        </Link>
        <ChevronRightIcon className="h-3 mx-1" />
        <Link
            className="hover:underline"
            href={`/category/${category.slug}`}
        >
            {category.name}
        </Link>
        <ChevronRightIcon className="h-3 mx-1" />

        {/* have error for next subcategories , i will fix this */}
        {subCategories.map((s: any) => (
            <Link
                key={s.name}
                className="hover:underline"
                href={`/category/${category.slug}/${s.name}`}
            >
                {s.name}
            </Link>
        ))}
    </div>
     );
}
 
export default BreadCrumb;
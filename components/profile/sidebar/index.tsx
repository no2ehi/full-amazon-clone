import Image from "next/image";
import Item from "./Item";
import { profileSidebar } from "./profileSidebar";

const Sidebar = ({ data }: any) => {
    return (
        <div>
            <div className="flex flex-col items-center ">
                <Image
                    src={data.image}
                    alt={data.name}
                    width={100}
                    height={100}
                    className="rounded-full outline outline-2 outline-offset-[3px] outline-slate-300"
                />
                <div className="mt-2 flex flex-col items-center ml-3">
                    <span className="font-bold text-xl">{data.name}</span>
                    <span className="text-sm text-slate-600">{data.email}</span>
                </div>
            </div>
            <ul className="mt-4">
                {profileSidebar.map((item: any, i: any) => (
                    <Item
                        key={i}
                        item={item}
                        visible={data.tab == i.toString()}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

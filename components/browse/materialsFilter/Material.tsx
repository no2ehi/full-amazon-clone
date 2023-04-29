import { useRouter } from "next/dist/client/router";

const Material = ({material, materialHandler}: any) => {
    const router = useRouter();
    const existedMaterials = router.query.material || "";
    return ( 
        <div onClick={() => materialHandler(`${existedMaterials ? `${existedMaterials}_${material}` : material}`)} className="flex items-center cursor-pointer">
            <input className="cursor-pointer  mr-2 w-4 h-4" type="checkbox" name="material" id={material} />
            <label className="cursor-pointer " htmlFor={material}>
                {material.length > 8 ? `${material.substring(0,8)}...` : material}
            </label>
        </div>
     );
}
 
export default Material;
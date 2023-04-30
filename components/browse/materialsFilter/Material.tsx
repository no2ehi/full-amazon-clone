import { useRouter } from "next/dist/client/router";

const Material = ({ material, materialHandler }: any) => {
    const router = useRouter();
    const existedMaterials = router.query.material || "";
    return (
        <div
            onClick={() =>
                materialHandler(
                    `${
                        existedMaterials
                            ? `${existedMaterials}_${material}`
                            : material
                    }`
                )
            }
            className="flex items-center cursor-pointer"
        >
            
        </div>
    );
};

export default Material;

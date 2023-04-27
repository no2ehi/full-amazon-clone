const Material = ({material}: any) => {
    return ( 
        <div className="flex items-center cursor-pointer">
            <input className="cursor-pointer  mr-2 w-4 h-4" type="checkbox" name="material" id={material} />
            <label className="cursor-pointer " htmlFor={material}>
                {material.length > 8 ? `${material.substring(0,8)}...` : material}
            </label>
        </div>
     );
}
 
export default Material;
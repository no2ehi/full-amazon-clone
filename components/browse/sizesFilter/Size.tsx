const Size = ({size}: any) => {
    return ( 
        <div className="flex items-center cursor-pointer">
            <input className="cursor-pointer  mr-2 w-4 h-4" type="checkbox" name="size" id={size} />
            <label className="cursor-pointer " htmlFor={size}>
                {size}
            </label>
        </div>
     );
}
 
export default Size;
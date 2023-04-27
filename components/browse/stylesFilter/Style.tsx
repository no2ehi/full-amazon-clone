const Style = ({style}: any) => {
    return ( 
        <div className="flex items-center cursor-pointer">
            <input className="cursor-pointer  mr-2 w-4 h-4" type="checkbox" name="style" id={style} />
            <label className="cursor-pointer " htmlFor={style}>
                {style}
            </label>
        </div>
     );
}
 
export default Style;
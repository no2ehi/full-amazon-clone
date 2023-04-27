const HeadingFilter = () => {
    return ( 
        <div className="">
            <div>
                <span>Price:</span>
                <input className="w-10" type="number" placeholder="min" min="0"  />
                <input className="w-10" type="number" placeholder="max" max="0" />
            </div>

        </div>
     );
}
 
export default HeadingFilter;
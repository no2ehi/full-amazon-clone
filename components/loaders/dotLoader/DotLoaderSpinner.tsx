import { DotLoader } from "react-spinners";

const DotLoaderSpinner = ({ loading }: any) => {
    return ( 
        <div className="fixed w-full h-screen top-0 right-0 left-0 bottom-0 bg-white/[0.5] z-20 grid justify-center items-center">
            <DotLoader loading={loading} color="#febd69" />
        </div>
     );
}
 
export default DotLoaderSpinner;
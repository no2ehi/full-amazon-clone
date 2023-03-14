import { ChevronRightIcon } from "@heroicons/react/24/solid";

const ButtonInput = ({type, text, ...props}: any) => {
    return (
        <button type={type} className="flex items-center justify-center w-full mt-4 button-orange  py-[0.5rem] text-sm text-gray-900 active:from-amazon-orange active:to-yellow-200 ">
            {text}
            <ChevronRightIcon className="h-3 ml-1" />
        </button>
    );
};

export default ButtonInput;

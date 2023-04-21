import { ErrorMessage, useField } from "formik";
import { useEffect, useRef, useState } from "react";

const ShippingInput = ({ placeholder, ...props }: any) => {
    const inputRef = useRef(null);
    const [field, meta] = useField<any>(props);
    const [move, setMove] = useState(false);

    useEffect(() => {
        if (field.value.length > 0) {
            setMove(true);
        } else {
            setMove(false);
        }
    }, [field.value]);

    return (
        <div className="mx-3">
            <div
                className={`relative `}
                onFocus={() => setMove(true)}
                onBlur={() => setMove(field.value.length > 0 ? true : false)}
            >
                <input
                    ref={inputRef}
                    type={props.type}
                    {...field}
                    {...props}
                    className={`w-full rounded-xl py-4 px-3 outline outline-2  focus:outline focus:outline-slate-300 focus:outline-4  ${
                        meta.touched && meta.error
                            ? "text-red-500 outline-red-200 bg-red-50 "
                            : "outline-slate-300"
                    }`}
                />
                <span
                    onClick={() => {
                        inputRef.current?.focus();
                        setMove(true);
                    }}
                    className={`absolute top-4 left-3 text-slate-500 ${
                        move ? "move " : ""
                    }`}
                >
                    {placeholder}
                </span>
            </div>

            {meta.touched && meta.error && (
                <p className="mt-1 ml-2 text-red-500 text-sm">
                    <ErrorMessage name={field.name} />
                </p>
            )}
        </div>
    );
};

export default ShippingInput;

import { ErrorMessage, useField } from "formik";

const InputAdmin = ({ type, placeholder, label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div className="mt-4">
            <label className={`flex ${meta.touched && meta.error ? "error-input-admin" : ""}`}>
                <span className="w-[130px] px-4 py-2 bg-blue-500 rounded-l text-white">
                    {label}
                </span>
                <input  
                    className="border  rounded-r px-4 py-2 outline-none "
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                />
            </label>
            {meta.touched && meta.error && (
                <div className="text-sm text-slate-700">
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    );
};

export default InputAdmin;

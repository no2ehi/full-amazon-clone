import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ErrorMessage, useField } from "formik";
const LoginInput = ({ icon, placeholder, type, ...props}: any) => {
    const [field, meta] = useField<any>(props);
    return (
        <div className={`flex mt-4 ${meta.touched && meta.error ? 'error-input' : ''}`}>
            <label className="w-full font-semibold ">
                {icon === "email" ? (
                    <div className="flex items-center mb-1">
                        <PaperAirplaneIcon className="h-4 -rotate-45 mr-1" />
                        Email
                    </div>
                ) : icon === "password" ? (
                    <div className="flex items-center mb-1">
                        <LockClosedIcon className="h-4 mr-1" />
                        {field.name === "conf_password" ? "Confirm Password" : "Password"}
                    </div>
                ) : icon === "user" ? (
                    <div className="flex items-center mb-1">
                        <UserIcon className="h-4 mr-1" />
                        Full Name
                    </div>
                ) : ''}
                <input
                    type={type}
                    // name={type}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    className="text-sm w-full placeholder:font-normal p-2 outline-none rounded border focus:shadow-amazon-orange"
                />
                {
                    (meta.touched && meta.error) && (
                        <div className="flex text-sm text-red-500">
                            <ErrorMessage name={field.name} />
                        </div>
                    )
                }
            </label>
        </div>
    );
};

export default LoginInput;

import { MenuItem, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";

const SingularSelect = ({data, handleChange, placeholder, ...rest}: any) => {
    const [field, meta] = useField(rest);
    return ( 
        <div className="mx-3 ">
            <TextField
                sx={{outline: 'none'}}
                name={field.name}
                select
                label={placeholder}
                value={field.value}
                onChange={handleChange}
                className={`w-full rounded-xl outline outline-2 focus:outline focus:outline-slate-300 focus:outline-4  ${
                    meta.touched && meta.error
                        ? "text-red-500 outline-red-200 bg-red-50 "
                        : "outline-slate-300"
                }`}
            >
                <MenuItem key="" value="">
                    No Selected / empty
                </MenuItem>
                {data.map((option: any) => (
                    <MenuItem key={option._id} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            {
                meta.touched && meta.error && (
                    <p className="mt-1 ml-2 text-red-500 text-sm"><ErrorMessage name={field.name} /></p>
                )
            }
        </div>
     );
}
 
export default SingularSelect;
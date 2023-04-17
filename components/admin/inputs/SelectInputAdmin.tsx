import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { ErrorMessage, useField } from "formik";

const SelectInputAdmin = ({
    data,
    label,
    handleChange,
    ...rest
}: any) => {
    const [field, meta] = useField(rest);

    return (
        <div className="mt-4">
            <h3 className={`font-semibold border-b pb-1 mb-3 ${meta.touched && meta.error ? "text-red-500 border-red-500" : ""}`}>{label}</h3>
            <TextField sx={{ width: 300 }}
                select
                label={label}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                disabled={rest.disabled}
            >
                <MenuItem key={""} value={""}>
                    no selected
                </MenuItem>
                {data.map((option: any) => (
                    <MenuItem key={option._id} value={option._id || option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            {meta.touched && meta.error && (
                <div className="text-sm text-red-500">
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    );
};

export default SelectInputAdmin;

import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputAdmin from "../inputs/InputAdmin";
import axios from "axios";
import SelectInputAdmin from "../inputs/SelectInputAdmin";


const CreateSubCategory = ({ setSubCategories, categories }: any) => {
    const [name, setName] = useState();
    const [parent, setParent] = useState();
    const validate = Yup.object({
        name: Yup.string()
            .required("Sub Category name is required.")
            .min(3, "Sub Category name must be between 3 and 32 characters.")
            .max(32, "Sub Category name must be between 3 and 32 characters.")
            .matches(
                /^[aA-zZ]/,
                "Numbers and special characters are not allowed."
            ),
        parent: Yup.string().required("Please choose a parent category"),
    });

    const submitHandler = async () => {
        try {
            const { data } = await axios.post("/api/admin/subcategory", {
                name,
                parent,
            });

            setSubCategories(data.subCategory);
            setName("");
            setParent("");
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    const handleChange = (e: any) => {
        setName(e.target.value);
    };

    return (
        <div className="mt-4">
            <div className="flex p-2 border-b pb-1 font-semibold">
                Create a Sub-Category
            </div>
            <Formik
                enableReinitialize
                initialValues={{ name, parent }}
                validationSchema={validate}
                onSubmit={() => submitHandler()}
            >
                {(form) => (
                    <Form className="flex-1 flex-col">
                        <InputAdmin
                            type="text"
                            name="name"
                            label="Sub-Category"
                            placeholder="sub Category Name"
                            icon="category"
                            onChange={handleChange}
                        />
                        <SelectInputAdmin
                            name="parent"
                            value={parent}
                            data={categories}
                            label="parent category"
                            handleChange={(e: any) => setParent(e.target.value)}
                        />
                        <button className="mt-4 bg-green-500 py-2 px-4 rounded mt-2 text-white">
                            add Sub Category
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateSubCategory;

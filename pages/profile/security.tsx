import Layout from "@/components/profile/layout/Layout";
import ButtonInput from "@/components/User/ButtonInput";
import LoginInput from "@/components/User/LoginInput";
import db from "@/utils/db";
import axios from "axios";
import { Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";
import DotLoaderSpinner from "../../components/loaders/dotLoader/DotLoaderSpinner";

const initialPassword = {
    current_password: "",
    new_password: "",
    conf_password: "",
    success: "",
    error: "",
};

const Security = ({ user, tab, orders }: any) => {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState(initialPassword);
    const { current_password, new_password, conf_password , success, error} = newPassword;

    const validation = Yup.object({
        current_password: Yup.string()
            .required("Please enter a current password.")
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "password can't be more than 36 characters."),
        new_password: Yup.string()
            .required("Please enter a New password.")
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "password can't be more than 36 characters."),
        conf_password: Yup.string()
            .required("Confirm our New password.")
            .oneOf([Yup.ref("new_password")], "Passwords must match."),
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        });
    };

    const changePasswordHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put("/api/user/changepassword", {
                current_password,
                new_password,
            });
            // console.log(data)

            setNewPassword({
                new_password: "",
                current_password: "",
                conf_password: "",
                success: data.message,
                error: "",
            });
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setNewPassword({
                new_password: "",
                current_password: "",
                conf_password: "",
                success: "",
                error: error.response.data.message,
            });
        }
    };
    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <Layout user={user} tab={tab} title={`Profile - Security`}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Profile - Security
                    </h2>
                </div>
                <div className="mx-auto md:w-1/3">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            current_password,
                            new_password,
                            conf_password,
                        }}
                        validationSchema={validation}
                        onSubmit={() => changePasswordHandler()}
                    >
                        {(form) => (
                            <Form>
                                <LoginInput
                                    id="current_passowrd"
                                    type="password"
                                    icon="password"
                                    name="current_password"
                                    placeholder="Current password"
                                    onChange={handleChange}
                                />

                                <LoginInput
                                    id="passowrd"
                                    type="password"
                                    icon="password"
                                    name="new_password"
                                    placeholder="New Password"
                                    onChange={handleChange}
                                />
                                <LoginInput
                                    id="passowrd-conf"
                                    type="password"
                                    icon="password"
                                    name="conf_password"
                                    placeholder="Re-type New Password"
                                    onChange={handleChange}
                                />
                                <ButtonInput
                                    type="submit"
                                    text="Change Password"
                                />
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-2 flex justify-center">
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : success ? (
                            <p className="text-green-500">{success}</p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Security;

export async function getServerSideProps(context: any) {
    db.connectDb();
    const { query } = context;
    const session = await getSession(context);
    const tab = query.tab || 0;

    if (!session) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    db.disconnectDb();
    return {
        props: {
            user: session?.user,
            tab,
        },
    };
}

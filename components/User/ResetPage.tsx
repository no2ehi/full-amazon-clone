import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import amazonLogoDark from "../../public/assets/images/amazon-dark.png";
import LoginInput from "./LoginInput";
import * as Yup from "yup";
import ButtonInput from "./ButtonInput";
import axios from "axios";

import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

const initialUser = {
    password: "",
    conf_password: "",
    success: "",
    error: ""
};

const ResetPage = ({ userId }: any) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { password, conf_password, success, error } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const passwordValidation = Yup.object({
        password: Yup.string().required("Please enter a new password.").min(6,"Password must be atleast 6 characters.").max(36,"password can't be more than 36 characters."),
        conf_password: Yup.string().required("Confirm your new password.").oneOf([Yup.ref("password")], "Passwords must match.")
    });

    const resetHandler = async () => {

        try{
            setLoading(true)
            const { data } = await axios.put("/api/auth/reset/",{
                userId,
                password
            });

            let options = {
                redirect: false,
                email: data.email,
                password: password
            }
            await signIn("credentials", options);
            window.location.reload();

            setUser({
                ...user, success: data.message , error: "", password: "", conf_password: ""
            })

            setLoading(false);

        } catch(error: any) {
            setLoading(false)
            setUser({
                ...user, success: "", error: error.response.data.message, password: "", conf_password: ""
            })
        }
    }

    return (
        <>
        {
            loading && (
                <DotLoaderSpinner loading={loading} />
            )
        }
        <div className="flex flex-col mx-auto w-full px-4 sm:w-3/5 md:w-3/5 lg:w-2/5  pt-8 pb-16">
            <div className="mx-auto my-2">
                <Link href="/">
                    <Image
                        src={amazonLogoDark}
                        alt="amazon-logo"
                        className="object-contain w-28 md:w-48 pt-2"
                    />
                </Link>
            </div>
            <div className="flex flex-col p-4 my-4 bg-white rounded border space-y-4">
                <h3 className="text-xl font-bold">Reset Password</h3>
                <Formik
                    enableReinitialize
                    initialValues={{
                        password,
                        conf_password
                    }}
                    validationSchema={passwordValidation}
                    onSubmit={() => resetHandler()}
                >
                    {(form) => (
                        <Form>
                            <LoginInput
                                id="input-password"
                                type="password"
                                icon="password"
                                name="password"
                                placeholder="new password"
                                onChange={handleChange}
                            />
                            <LoginInput
                                id="input-conf-password"
                                type="password"
                                icon="password"
                                name="conf_password"
                                placeholder="Re-Type new password"
                                onChange={handleChange}
                            />
                            <ButtonInput type="submit" text="change password" />
                        </Form>
                    )}
                </Formik>

                <div className="flex">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : success ? (
                        <p className="text-green-500">{success}</p>
                    ) : ''}
                </div>
            
                <div className="text-sm flex items-center pt-4">
                    <span className="text-black ml-1">
                        Already have an account?
                    </span>
                    <Link
                        className="flex items-center text-blue-500 hover:text-amazon-orange hover:underline ml-2"
                        href="/auth/signin"
                    >
                        Sign In
                        <ChevronRightIcon className="h-3 text-gray-500"/>
                    </Link>
                </div>
            </div>

        </div>
        </>
    );
};

export default ResetPage;

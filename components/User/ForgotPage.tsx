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

const initialUser = {
    email: "",
    success: "",
    error: ""
};

const ForgotPage = ({ providers }: any) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { email, success, error } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const emailValidation = Yup.object({
        email: Yup.string()
            .required("Email address is required.")
            .email("Please enter a valid address"),
    });


    const forgotHandler = async () => {
        try{
            setLoading(true)

            const { data } = await axios.post("/api/auth/forgot/",{
                email
            });

            setUser({
                ...user, email: "", success: data.message , error: ""
            })

            setLoading(false);

        } catch(error: any) {
            setLoading(false)
            setUser({
                ...user, success: "", error: error.response.data.message
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
                <h3 className="text-xl font-bold">Sign Up</h3>
                <Formik
                    enableReinitialize
                    initialValues={{
                        email,
                    }}
                    validationSchema={emailValidation}
                    onSubmit={ () => forgotHandler() }
                >
                    {(form) => (
                        <Form>
                            <LoginInput
                                id="input-email"
                                type="text"
                                icon="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                            />
                            <ButtonInput type="submit" text="Send Link" />
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

export default ForgotPage;

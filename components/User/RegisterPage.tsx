import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import amazonLogoDark from "../../public/assets/images/amazon-dark.png";
import LoginInput from "./LoginInput";
import * as Yup from "yup";
import ButtonInput from "./ButtonInput";
import Router from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";

import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const initialUser = {
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: ""
};

const RegisterPage = ({ providers }: any) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { name, email, password, conf_password, success, error } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        // console.log(user);
    };

    const registerValidation = Yup.object({
        name: Yup.string().required("What's your name?").min(2,"First name must be between 2 and 16 characters.").max(16,"First name must be between 2 and 16 characters.").matches(/^[aA-zZ]/,"Numbers and Special characters are not allowed"),
        email: Yup.string()
            .required("Email address is required.")
            .email("Please enter a valid address"),
        password: Yup.string().required("Please enter a password.").min(6,"Password must be atleast 6 characters.").max(36,"password can't be more than 36 characters."),
        conf_password: Yup.string().required("Confirm our password.").oneOf([Yup.ref("password")], "Passwords must match.")
    });


    const signUpHandler = async () => {
        try{
            setLoading(true);
            const { data } = await axios.post('/api/auth/signup/',{
                name,
                email,
                password
            });

            setUser({
                ...user, error: "", success: data.message
            })
            setLoading(false);

            setTimeout( async () => {
                setLoading(true);
                let options = {
                    redirect: false,
                    email: email,
                    password: password
                }

                const res = await signIn("credentials", options);
                Router.push("/")
            }, 2000);

        } catch(error: any) {
            setLoading(false);
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
                        name,
                        email,
                        password,
                        conf_password,
                    }}
                    validationSchema={registerValidation}
                    onSubmit={ () => signUpHandler() }
                >
                    {(form) => (
                        <Form>
                            <LoginInput
                                id="input-name"
                                type="text"
                                icon="user"
                                name="name"
                                placeholder="your Name"
                                onChange={handleChange}
                            />
                            <LoginInput
                                id="input-email"
                                type="text"
                                icon="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                            />

                            <LoginInput
                                id="input-passowrd"
                                type="password"
                                icon="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                            <LoginInput
                                id="input-passowrd-conf"
                                type="password"
                                icon="password"
                                name="conf_password"
                                placeholder="Re-type Password"
                                onChange={handleChange}
                            />
                            <ButtonInput type="submit" text="Sign up" />
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

                <p className="text-xs my-2">
                    {"By continuing, you agree to Amazon's Conditions of Use and Privacy Notice."}
                </p>

                
                <span className="pt-1 relative flex justify-center text-sm 
                before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[10%] sm:before:w-[18%] md:before:w-[22%]
                after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[10%] sm:after:w-[18%] md:after:w-[22%]">
                    sign up with another Accounts
                </span>
                

                <div className="flex flex-col lg:flex-row">
                    {providers.map((provider: any) => {
                        if(provider.name === "Credentials") {
                            return;
                        }
                        return (
                            <div
                                onClick={() => signIn(provider.id)}
                                key={provider.name}
                                className="flex bg-white items-center w-full p-2 rounded-xl border mt-3 lg:mt-1 mx-2 cursor-pointer"
                            >
                                <Image
                                    src={`/../public/assets/images/${provider.id}.png`}
                                    alt={provider.name}
                                    width={28}
                                    height={28}
                                />
                                <div className="text-sm w-full font-semibold ml-2">
                                    Sign in with {provider.name}
                                </div>
                            </div>
                        )
                    })}
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

export default RegisterPage;

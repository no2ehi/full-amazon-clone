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
import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const initialUser = {
    login_email: "",
    login_password: "",
    login_error: "",
};

const SignInPage = ({ providers, csrfToken, callbackUrl }: any) => {
    const [loading, setLoading] = useState(false);
    const [needHelp, setNeedHelp] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { login_email, login_password, login_error } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const loginValidation = Yup.object({
        login_email: Yup.string()
            .required("Email address is required.")
            .email("Please endter a valid address"),
        login_password: Yup.string().required("Please enter a password."),
    });

    const signInHandler = async () => {
        setLoading(true);
        let options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };

        const res = await signIn("credentials", options);
        setUser({
            ...user,
            login_error: "",
        });
        setLoading(false);

        if (res?.error) {
            setLoading(false);
            setUser({
                ...user,
                login_error: res?.error,
            });
        } else {
            return Router.push(callbackUrl || "/");
        }
    };

    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
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
                    <h3 className="text-xl font-bold">Sign in</h3>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            login_email,
                            login_password,
                        }}
                        validationSchema={loginValidation}
                        onSubmit={() => signInHandler()}
                    >
                        {(form) => (
                            <Form method="post" action="/api/auth/signin/email">
                                <input
                                    type="hidden"
                                    name="csrfToken"
                                    defaultValue={csrfToken}
                                />
                                <LoginInput
                                    id="input-email"
                                    type="text"
                                    icon="email"
                                    name="login_email"
                                    placeholder="please type Email Address"
                                    onChange={handleChange}
                                />

                                <LoginInput
                                    id="input-passowrd"
                                    type="password"
                                    icon="password"
                                    name="login_password"
                                    placeholder="please type Password"
                                    onChange={handleChange}
                                />
                                <ButtonInput type="submit" text="Sign in" />
                            </Form>
                        )}
                    </Formik>

                    <p className="text-xs mt-2">
                        {
                            "By continuing, you agree to Amazon's Conditions of Use and Privacy Notice."
                        }
                    </p>
                    <div className="flex">
                        {login_error && (
                            <p className="text-red-500">{login_error}</p>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {providers.map((provider: any) => {
                            if (provider.name === "Credentials") {
                                return;
                            }
                            return (
                                <div
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                    className="flex bg-white items-center w-full p-2 rounded-xl border mt-3 md:mt-1 mx-2 cursor-pointer"
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
                            );
                        })}
                    </div>

                    <div
                        onClick={() => setNeedHelp(!needHelp)}
                        className="text-xs flex flex-col cursor-pointer"
                    >
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className={`h-3 text-gray-500" ${
                                    needHelp && "rotate-90"
                                }`}
                            />
                            <span className="text-blue-500 hover:text-amazon-orange hover:underline ml-1">
                                Need help?
                            </span>
                        </div>
                        {needHelp && (
                            <div className="flex flex-col ml-4 mt-2 space-y-2">
                                <Link
                                    href="/auth/forgot"
                                    className="text-blue-500 hover:text-amazon-orange hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                                <Link
                                    href="/"
                                    className="text-blue-500 hover:text-amazon-orange hover:underline"
                                >
                                    Other issues with Sign-In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-3">
                    <span
                        className="pt-1 relative flex justify-center text-sm 
                before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[20%] sm:before:w-[25%] md:before:w-[31%]
                after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[20%] sm:after:w-[25%] md:after:w-[31%]"
                    >
                        New to Amazon?
                    </span>
                    <Link
                        href="/auth/register"
                        className="flex items-center justify-center w-full mt-4 button-orange  py-[0.5rem] text-sm text-gray-900 active:from-amazon-orange active:to-yellow-200 "
                    >
                        Create your Amazon account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignInPage;

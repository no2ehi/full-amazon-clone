import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import amazonLogoDark from "../../public/assets/images/amazon-dark.png";
import LoginInput from "./LoginInput";
import * as Yup from "yup";
import ButtonInput from "./ButtonInput";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const initialUser = {
    login_email: "",
    login_password: "",
};

const SignInPage = ({ providers }: any) => {
    const router = useRouter();
    const [needHelp, setNeedHelp] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { login_email, login_password } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        console.log(user);
    };
    const loginValidation = Yup.object({
        login_email: Yup.string()
            .required("Email address is required.")
            .email("Please endter a valid address"),
        login_password: Yup.string().required("Please enter a password."),
    });

    return (
        <div className="flex flex-col mx-auto w-full px-4 sm:w-3/5 md:w-2/5  pt-8 pb-16">
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
                >
                    {(form) => (
                        <form>
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
                        </form>
                    )}
                </Formik>

                <p className="text-xs mt-2">
                    By continuing, you agree to Amazon's Conditions of Use and
                    Privacy Notice.
                </p>

                

                <div className="flex flex-col md:flex-row">
                    {providers.map((provider: any) => (
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
                    ))}
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
                            <Link href="/forget" className="text-blue-500 hover:text-amazon-orange hover:underline">
                                Forgot your password?
                            </Link>
                            <Link href="/" className="text-blue-500 hover:text-amazon-orange hover:underline">
                                Other issues with Sign-In
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <div className="flex flex-col mt-3">
                <span className="pt-1 relative flex justify-center text-sm 
                before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[120px]
                after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[120px]">
                    New to Amazon?
                </span>
                <Link href="/auth/register" className="flex items-center justify-center w-full mt-4 button-orange  py-[0.5rem] text-sm text-gray-900 active:from-amazon-orange active:to-yellow-200 ">Create your Amazon account
                    </Link>
            </div>
        </div>
    );
};

export default SignInPage;

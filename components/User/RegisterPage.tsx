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

const initialUser = {
    full_name: "",
    email: "",
    password: "",
    conf_password: "",
};

const RegisterPage = ({ providers }: any) => {
    const [needHelp, setNeedHelp] = useState(false);
    const [user, setUser] = useState(initialUser);
    const { full_name, email, password, conf_password } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
        console.log(user);
    };
    const registerValidation = Yup.object({
        full_name: Yup.string().required("What's your name?").min(2,"First name must be between 2 and 16 characters.").max(16,"First name must be between 2 and 16 characters.").matches(/^[aA-zZ]/,"Numbers and Special characters are not allowed"),
        email: Yup.string()
            .required("Email address is required.")
            .email("Please enter a valid address"),
        password: Yup.string().required("Please enter a password.").min(6,"Password must be atleast 6 characters.").max(36,"password can't be more than 36 characters."),
        conf_password: Yup.string().required("Confirm our password.").oneOf([Yup.ref("password")], "Passwords must match.")
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
                <h3 className="text-xl font-bold">Sign Up</h3>
                <Formik
                    enableReinitialize
                    initialValues={{
                        full_name,
                        email,
                        password,
                        conf_password,
                    }}
                    validationSchema={registerValidation}
                >
                    {(form) => (
                        <form>
                            <LoginInput
                                id="input-name"
                                type="text"
                                icon="user"
                                name="full_name"
                                placeholder="Full Name"
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
                                id="input-passowrd"
                                type="password"
                                icon="password"
                                name="conf_password"
                                placeholder="Re-type Password"
                                onChange={handleChange}
                            />
                            <ButtonInput type="submit" text="Sign up" />
                        </form>
                    )}
                </Formik>

                <p className="text-xs my-2">
                    By continuing, you agree to Amazon's Conditions of Use and
                    Privacy Notice.
                </p>

                
                <span className="pt-1 relative flex justify-center text-sm 
                before:left-1 before:top-[50%] before:absolute before:bg-slate-200 before:h-[1px] before:w-[120px]
                after:right-1 after:top-[50%] after:absolute after:bg-slate-200 after:h-[1px] after:w-[120px]">
                    sign up with another Accounts
                </span>
                

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
    );
};

export default RegisterPage;

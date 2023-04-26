import Head from "next/head";
import React from "react";
import { PrimaryNavBar } from ".";
import Footer from "./Footer";
import Login from "./Login";
import { SecondaryNavBar } from ".";
import { useStateContext } from "../context/ContextWrapper";

const Layout = ({ children }) => {
    const { navBarCategories } = useStateContext();
    return (
        <div className="w-full overflow-x-hidden">
            <Head>
                <title>Mex Ecommerce</title>
            </Head>

            <header className="sticky top-0 z-30">
                <PrimaryNavBar categories={navBarCategories} />
                <Login />
            </header>

            <div>
                <SecondaryNavBar />
            </div>

            <main className="w-full bg-light-blue h-full">{children}</main>

            <footer className="h-full w-full m-auto bg-[#0C0E30]">
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;

import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/ContextWrapper";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
    return (
        <GoogleOAuthProvider
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`}
        >
            <StateContext>
                <Layout >
                    <Toaster />
                    <Component {...pageProps} />
                </Layout>
            </StateContext>
        </GoogleOAuthProvider>
    );
}

export default MyApp;

import { useEffect } from "react";

export default function Favicon() {
    useEffect(() => {
        const updateFavicon = (theme) => {
            const favicon = document.getElementById("favicon");
            if (theme !== "dark") {
                favicon.href = "/favicon-dark.ico";
            } else {
                favicon.href = "/favicon-light.ico";
            }
        };

        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        updateFavicon(prefersDarkScheme.matches ? "dark" : "light");
        prefersDarkScheme.addEventListener("change", (e) => {
            updateFavicon(e.matches ? "dark" : "light");
        });

        return () => {
            prefersDarkScheme.removeEventListener("change", () => { });
        };
    }, []);
}




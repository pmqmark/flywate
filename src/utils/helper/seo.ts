import { BASE_URL_FRONTEND } from "../endpoints";


export const GLOBAL_METADATA = {
    authors: [{ name: "Qmark Technolabs Team" }],
    publisher: "Flywate",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true }
    },
    metadataBase: new URL(BASE_URL_FRONTEND),
    icon: {
        icon: "/tabLogo.png",
        apple: "/apple-touch-icon.png",
    }
}
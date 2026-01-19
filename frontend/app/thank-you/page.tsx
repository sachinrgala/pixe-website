import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
    title: "Thank You | Pixe Education",
    description: "Your enquiry has been received. Our team will contact you shortly.",
    robots: { index: false, follow: false },
};

export default function ThankYouPage() {
    return <ClientPage />;
}

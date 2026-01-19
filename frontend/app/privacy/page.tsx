
import { Metadata } from "next";
import LegalPortal from "./LegalPortal";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Legal Center | Pixe Education",
    description: "Unified Legal Portal for Pixe Education - Privacy Policy, Terms of Service, and Refund Policy.",
};

export default function PrivacyPage() {
    return (
        <>
            <LegalPortal />
            <Footer />
        </>
    );
}

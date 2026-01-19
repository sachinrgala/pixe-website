"use client";

import Link from "next/link";
import { useState } from "react";

interface FormItem {
    id: string;
    name: string;
    location: string;
    type: "Dynamic" | "Static";
    editUrl?: string; // If dynamic, where to go
    description: string;
}

const FORMS_DATA: FormItem[] = [
    {
        id: "lead-form",
        name: "Lead Capture Form",
        location: "Home Page, Popups, Location Pages",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=lead-form",
        description: "The main lead generation form used across the site. Fully customizable.",
    },
    {
        id: "contact-form",
        name: "Contact Us Form",
        location: "/contact",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=contact-form",
        description: "Standard contact inquiry form.",
    },
    {
        id: "corporate-hiring",
        name: "Corporate Hiring Partner",
        location: "/career/hire-talent",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=corporate-hiring",
        description: "Form for companies looking to hire talent.",
    },
    {
        id: "corporate-training",
        name: "Corporate Training Inquiry",
        location: "/corporate-training",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=corporate-training",
        description: "Inquiry form for employee training programs.",
    },
    {
        id: "free-counseling",
        name: "Free Counseling Widget",
        location: "/free-counseling",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=free-counseling",
        description: "Booking widget for counseling sessions.",
    },
    {
        id: "syllabus-download",
        name: "Syllabus Download",
        location: "/courses/[slug]",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=syllabus-download",
        description: "Form to unlock course syllabus.",
    },
    {
        id: "registration",
        name: "Student Registration",
        location: "Registration Component",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=registration",
        description: "Detailed registration form for new students.",
    },
    {
        id: "newsletter",
        name: "Newsletter Subscription",
        location: "Footer, Resources Sidebar",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=newsletter",
        description: "Simple email subscription field.",
    },
    {
        id: "financial-advisor",
        name: "Financial Advisor Request",
        location: "/pricing",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=financial-advisor",
        description: "Lead form for pricing inquiries.",
    },
    {
        id: "tools-download",
        name: "Tools Download",
        location: "/resources/tools",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=tools-download",
        description: "Email capture for free tools access.",
    },
    {
        id: "career-guide",
        name: "Career Guide Download",
        location: "/career/career-guide",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=career-guide",
        description: "Lead magnet for career guide PDF.",
    },
    {
        id: "internship-application",
        name: "Internship Application",
        location: "/internships",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=internship-application",
        description: "Application form for internship positions.",
    },
    {
        id: "masterclass-registration",
        name: "Masterclass Registration",
        location: "/masterclass",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=masterclass-registration",
        description: "Registration form for live masterclasses.",
    },
    {
        id: "location-lead-form",
        name: "Location Quick Apply",
        location: "/locations/[city]",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=location-lead-form",
        description: "Quick apply form for location-specific pages.",
    },
    {
        id: "brochure-download",
        name: "Home Brochure Download",
        location: "Home Landing (Bottom)",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=brochure-download",
        description: "Simple email capture for brochure download.",
    },
    {
        id: "course-quick-apply",
        name: "Course Template Quick Apply",
        location: "Course Pages (Sticky Sidebar)",
        type: "Dynamic",
        editUrl: "/dashboard/formfields?form=course-quick-apply",
        description: "Quick application form on individual course pages.",
    },
];

export default function FormsManagerPage() {
    const [showStaticModal, setShowStaticModal] = useState(false);
    const [selectedForm, setSelectedForm] = useState<FormItem | null>(null);

    const handleEditClick = (form: FormItem) => {
        if (form.type === "Static") {
            setSelectedForm(form);
            setShowStaticModal(true);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Forms Manager</h1>
                    <p className="text-gray-400">View and manage all forms across your website.</p>
                </div>
            </div>

            <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-[#1a1d21] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Form Name</th>
                            <th className="px-6 py-4 font-semibold">Location</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {FORMS_DATA.map((form) => (
                            <tr key={form.id} className="hover:bg-[#2a2e35] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{form.name}</div>
                                    <div className="text-xs text-gray-500 mt-1">{form.description}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-300 text-sm font-mono">
                                    {form.location}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold uppercase ${form.type === "Dynamic"
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-gray-700 text-gray-400"
                                            }`}
                                    >
                                        {form.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {form.type === "Dynamic" ? (
                                        <Link
                                            href={form.editUrl!}
                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                                        >
                                            <i className="fas fa-edit"></i> Edit Fields
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(form)}
                                            className="px-3 py-1.5 bg-[#1a1d21] border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                                        >
                                            <i className="fas fa-lock"></i> View Info
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Static Form Info Modal */}
            {showStaticModal && selectedForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#25282e] border border-gray-700 rounded-xl w-full max-w-md p-6 shadow-2xl transform transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                <i className="fas fa-code text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Static Form</h3>
                                <p className="text-gray-400 text-sm">{selectedForm.name}</p>
                            </div>
                        </div>

                        <div className="bg-[#1a1d21] rounded-lg p-4 border border-gray-800 mb-6">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                This form is currently <strong>hardcoded</strong> in the website source code.
                                It cannot be edited directly from the dashboard yet.
                            </p>
                            <div className="mt-3 pt-3 border-t border-gray-800">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Developer File Location</p>
                                <code className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded block break-all">
                                    {selectedForm.id === 'contact-form' && 'frontend/app/contact/page.tsx'}
                                    {selectedForm.id === 'corporate-hiring' && 'frontend/app/career/hire-talent/page.tsx'}
                                    {selectedForm.id === 'corporate-training' && 'frontend/app/corporate-training/page.tsx'}
                                    {selectedForm.id === 'free-counseling' && 'frontend/components/forms/BookingWidget.tsx'}
                                    {selectedForm.id === 'syllabus-download' && 'frontend/components/forms/SyllabusForm.tsx'}
                                    {selectedForm.id === 'registration' && 'frontend/components/forms/RegistrationForm.tsx'}
                                    {selectedForm.id === 'newsletter' && 'frontend/components/layout/Footer.tsx'}
                                </code>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowStaticModal(false)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

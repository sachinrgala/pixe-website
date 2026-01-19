"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

export default function CertificationsPage() {
    return (
        <>
            <main className="font-display bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white overflow-x-hidden antialiased flex flex-col min-h-screen">

                {/* Hero Section */}
                <header className="bg-white dark:bg-[#1a2332] relative">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 w-fit mx-auto lg:mx-0 border border-blue-100 dark:border-blue-900/50">
                                <span className="material-symbols-outlined text-[#135bec] text-sm">verified</span>
                                <span className="text-xs font-semibold text-[#135bec] tracking-wide uppercase">Official Partners</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-white">
                                Globally Recognized Digital Marketing Certifications
                            </h1>
                            <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                                Unlock career opportunities with credentials trusted by top employers worldwide. Prove your skills with rigorous, job-relevant assessments and get hired faster.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a href="/free-counseling" className="flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white h-12 px-8 rounded-lg font-bold text-base transition-colors shadow-lg shadow-[#135bec]/20">
                                    Get Certified
                                </a>
                                <button className="bg-transparent border border-gray-300 dark:border-gray-600 text-[#111318] dark:text-white h-12 px-8 rounded-lg font-bold text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">play_circle</span>
                                    How it works
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-lg lg:max-w-none">
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group">
                                {/* Abstract gradient representing success and digital certification */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-90 mix-blend-multiply"></div>
                                <div className="w-full h-full bg-cover bg-center" data-alt="Student holding a certificate smiling in a graduation setting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBhQe6Exmeo3C65Firw1dnWhslXL8FaWbSENCcvoHKmo88AMziMnUIrz7tFKv3ey3cb4PSIua6fK-mICSgdL5UjxfpbR2Xn9i33hdx4EJ_wdVoUrjt5QOIAR8DM6jveZYk3oMP60-bNzp-q7NCX_OXhw9iA2bMC84apILI7dW8KaWJnY6u7q0uG-X5X_Q6Caj0HIpwE7XkcPqPuwv6RTytc0HwZ82CgKem9faWZm-JN-BGGHlo96ERN44i5Zwk3uXBWWlfA7KEQ2g')" }}></div>
                                {/* Floating Badge 1 */}
                                <div className="absolute top-8 left-8 bg-white dark:bg-[#1a2332] p-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: "3s" }}>
                                    <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <span className="material-symbols-outlined">workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Verified</p>
                                        <p className="text-sm font-bold text-[#111318] dark:text-white">Google Ads</p>
                                    </div>
                                </div>
                                {/* Floating Badge 2 */}
                                <div className="absolute bottom-8 right-8 bg-white dark:bg-[#1a2332] p-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: "4s" }}>
                                    <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Mastery</p>
                                        <p className="text-sm font-bold text-[#111318] dark:text-white">Analytics 4.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Recognition Logos (Trust Anchors) */}
                <section className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-6 md:py-8 overflow-hidden">
                    <div className="max-w-[1280px] mx-auto px-4 text-center">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Certifications recognized by industry leaders</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Logos using generic geometric shapes/text placeholders */}
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-3xl">search</span> Google
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-3xl">public</span> Meta
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-3xl">hub</span> HubSpot
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-3xl">bar_chart</span> SEMrush
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-3xl">play_arrow</span> YouTube
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program-wise Certification Chart */}
                <section className="py-10 lg:py-16 bg-[#f6f6f8] dark:bg-[#101622]">
                    <div className="max-w-[960px] mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#111318] dark:text-white mb-3">Program-wise Certification Roadmap</h2>
                            <p className="text-gray-600 dark:text-gray-400">Clear path from learning to certification for every specialization.</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a2332] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                            <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 w-1/3">Master Course</th>
                                            <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 w-1/3">Certification Included</th>
                                            <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200">Validity</th>
                                            <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-[#111318] dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#135bec]">
                                                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                                                    </div>
                                                    Digital Marketing Master
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium border border-green-200 dark:border-green-800">
                                                        Google Ads
                                                    </span>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800">
                                                        Meta Blueprint
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">Lifetime</td>
                                            <td className="p-4">
                                                <a className="text-[#135bec] text-sm font-bold hover:underline" href="#">Syllabus</a>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-[#111318] dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                                        <span className="material-symbols-outlined text-lg">search</span>
                                                    </div>
                                                    SEO Specialist
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-medium border border-orange-200 dark:border-orange-800">
                                                    SEMrush Certification
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">2 Years</td>
                                            <td className="p-4">
                                                <a className="text-[#135bec] text-sm font-bold hover:underline" href="#">Syllabus</a>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-[#111318] dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600">
                                                        <span className="material-symbols-outlined text-lg">share</span>
                                                    </div>
                                                    Social Media Marketing
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 text-xs font-medium border border-pink-200 dark:border-pink-800">
                                                    HubSpot Social Media
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">Lifetime</td>
                                            <td className="p-4">
                                                <a className="text-[#135bec] text-sm font-bold hover:underline" href="#">Syllabus</a>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-[#111318] dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                                        <span className="material-symbols-outlined text-lg">query_stats</span>
                                                    </div>
                                                    Analytics Professional
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-800">
                                                    Google Analytics 4
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">1 Year</td>
                                            <td className="p-4">
                                                <a className="text-[#135bec] text-sm font-bold hover:underline" href="#">Syllabus</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certificate Visual Proof (Authenticity) */}
                <section className="py-10 lg:py-16 bg-white dark:bg-[#1a2332]">
                    <div className="max-w-[1280px] mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#111318] dark:text-white">Issued Certificates</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">Authentic credentials earned by our recent graduates.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-lg">verified_user</span>
                                <span>Verifiable via Blockchain ID</span>
                            </div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x no-scrollbar pb-6 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                            {/* Certificate 1 */}
                            <div className="min-w-[70vw] sm:min-w-0 snap-center group relative cursor-pointer">
                                <div className="aspect-[4/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center shadow-md transition-transform duration-300 group-hover:-translate-y-1" data-alt="Digital marketing certificate document preview" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk02Cxo_YEzRQ4xBEp6jBEvodgt-FfwXnxSym1Tt-p4SYenVtwZFriq4DwHfFBae5XcdgRNwxC_iE_jzfK-sjyEMc92WCjn9ZvdRjhSOpvjQQLQ0bj2GY0_3V9e6hoWXeCYnrECxc114C8UxX4XTf7HLUGtdOkWKeAe_NYV6wtKZGniz4dSa9ZD6Xqq7JZoYEWmLXYBIOneFhTJ8y70Xl1RXATl3H-bT602NBJ7KX0_0H-VHM9n0qCfykGHKGmCdFyX5q7yFVL1cs')" }}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-[#111318] dark:text-white">Advanced SEO</p>
                                <p className="text-xs text-gray-500">Issued to Sarah J.</p>
                            </div>
                            {/* Certificate 2 */}
                            <div className="min-w-[70vw] sm:min-w-0 snap-center group relative cursor-pointer">
                                <div className="aspect-[4/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center shadow-md transition-transform duration-300 group-hover:-translate-y-1" data-alt="Data analytics completion certificate preview" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7rWH-px9RZiljWhoJ5nATu1Nb16o7j-ZORv4aosBNoA0Zca6jjni3m85gtCtSk0PZYfdFz6uwv7_-tJiEF_syRhx_sQk0zUBoHRMwNQo4hi66cfTl7-qXy0HzMXy-ETI8kme4uEViGiEi65nhARUhB1L8jAvr3xGwgKiwb7AvOlw8qH8frZb_jytmJo9sQCZJaLugQkijxefprHHh49LhQoxhgJg6R1MP8mp-G2jzp1LlsvIRlX_TJv3tX0BsCL9ynmUcx0oWnV4')" }}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-[#111318] dark:text-white">Google Ads Master</p>
                                <p className="text-xs text-gray-500">Issued to Mike T.</p>
                            </div>
                            {/* Certificate 3 */}
                            <div className="min-w-[70vw] sm:min-w-0 snap-center group relative cursor-pointer">
                                <div className="aspect-[4/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center shadow-md transition-transform duration-300 group-hover:-translate-y-1" data-alt="Social media marketing professional certificate" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALbeqSvfAV5IEd7pe4UafBC0rdBp8zL0GQpnFpKo_-NdX_-2Uk_z0DKnU8V-bfU6myMFcfoUaS8u0dCS_L4pOh3xd4FXhQ3Jo2yBGaFquiiqVjSq3xyV_zK0pYrzfon75ncjcxJ81R9WElxk5uNNrOQsKaxKYcsdxHXq5kp1aCg_WOIZ6VhS0moeqK8bWE5jE72gNvlKhyI8qcnDQkhkBfRCQSfTNKrabKl4c6urpUDXeT_9WpTOSY76t3zszcbNFbQ_fEzLbMt_w')" }}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-[#111318] dark:text-white">Social Media Strategist</p>
                                <p className="text-xs text-gray-500">Issued to Priya K.</p>
                            </div>
                            {/* Certificate 4 */}
                            <div className="min-w-[70vw] sm:min-w-0 snap-center group relative cursor-pointer">
                                <div className="aspect-[4/3] w-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center shadow-md transition-transform duration-300 group-hover:-translate-y-1" data-alt="Content marketing mastery certificate document" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtDsAE0shXAg17sV_e6FGvtHzFCpJkZlKN9eyhtFmXDsQVo2slF0I_3LCznPkrCNkRjiMe_5KmCW74-Zngr3rP4UPH8jpg1pOJVrR2_XgN0aYYF-CL_FykO603L7S4UHYTh8W4lAsFKhKwcf6qYkzPgOPu8U09_EAEBmf7Ao77cRqiOLranA0oIItlH_YaKVyEKlPAnn8RRDeFwNcFMhJwW4XQyL5h8pC4rM5N1Kv88w7J_GhW7ucln54st7I05TBc50kEXpvRZjs')" }}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">Preview</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-[#111318] dark:text-white">Content Marketing</p>
                                <p className="text-xs text-gray-500">Issued to David L.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Accreditation & Video Walkthrough */}
                <section className="py-10 lg:py-16 bg-[#f6f6f8] dark:bg-[#101622]">
                    <div className="max-w-[1280px] mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Video & Process */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#111318] dark:text-white">How We Certify You</h2>
                            <p className="text-gray-600 dark:text-gray-400">Our rigorous process ensures that every certificate holds weight in the job market.</p>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="flex-none size-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h4 className="font-bold text-[#111318] dark:text-white">Complete Coursework</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Finish all modules and live projects with 80% attendance.</p>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 ml-4"></div>
                                <div className="flex gap-4">
                                    <div className="flex-none size-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h4 className="font-bold text-[#111318] dark:text-white">Skills Assessment</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pass the 2-hour proctored exam testing practical skills.</p>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 ml-4"></div>
                                <div className="flex gap-4">
                                    <div className="flex-none size-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h4 className="font-bold text-[#111318] dark:text-white">Earn Verification</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive your digital badge and physical certificate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Video Thumbnail */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                            <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Video thumbnail showing students in a classroom" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpRx1yVdrBeInCPqmu7GNfWPILAvRb1o5bIJUi4Rt9-yPTj0kztg3jW1m0te_CcT50v6Z7Bk2tBtOpVM5_bOJLS9HdGMt-Hf97-o3g-Nrj5fEzjKvK8A9Ic7f2s7YGb_4M5Uvw8g0-AX1LUQ3WIDqIctqsdoa0k-3yKnGt3n9GpchAvlIx4Q9benzT9LyZUR5IG9y89datCXE1ZGlI_ruptXWMNF0H0DJ_Wd4ZqSGo20zv7h7ZUOFlpZIUoNsZ5z60XrS17EU2CeU')" }}></div>
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="size-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-white">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Placement Impact (ROI) */}
                <section className="py-10 lg:py-16 bg-[#135bec] text-white relative overflow-hidden">
                    {/* Abstract bg pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 20%), radial-gradient(circle at 80% 80%, white 0%, transparent 20%)" }}></div>
                    <div className="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">The Real Value of Certification</h2>
                        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto snap-x no-scrollbar pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                            <div className="min-w-[60vw] md:min-w-0 snap-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                <p className="text-5xl font-black mb-2">40%</p>
                                <p className="text-lg font-medium opacity-90">Higher Salary</p>
                                <p className="text-xs mt-2 opacity-70">Compared to non-certified peers</p>
                            </div>
                            <div className="min-w-[60vw] md:min-w-0 snap-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                <p className="text-5xl font-black mb-2">3x</p>
                                <p className="text-lg font-medium opacity-90">More Interviews</p>
                                <p className="text-xs mt-2 opacity-70">On LinkedIn & Job Portals</p>
                            </div>
                            <div className="min-w-[60vw] md:min-w-0 snap-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                <p className="text-5xl font-black mb-2">500+</p>
                                <p className="text-lg font-medium opacity-90">Hiring Partners</p>
                                <p className="text-xs mt-2 opacity-70">Actively looking for our graduates</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <a className="inline-flex items-center gap-2 text-white font-bold hover:underline" href="#">
                                View Placement Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Student Wins & Employer Validation */}
                <section className="py-10 lg:py-16 bg-white dark:bg-[#1a2332]">
                    <div className="max-w-[1280px] mx-auto px-4">
                        {/* Student Wins */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-8">What Our Certified Graduates Say</h3>
                            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x no-scrollbar pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                                {/* Testimonial 1 */}
                                <div className="min-w-[85vw] md:min-w-0 snap-center p-6 rounded-xl bg-[#f6f6f8] dark:bg-[#101622] border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-12 rounded-full bg-cover bg-center" data-alt="Portrait of successful student" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAA9bm3CUlAAPj7y15mTKuRU7xbljvZwmbb4W5i5f8CwGkrLxKr92AruEzby2XMWN-aGYAHDR5cnJX_5urzW4I6COC8NzXTPqXAyHXyi1-6VGYtwKUyDGHLJGOD7DZX1PFAeMZtaEI-S2HmPhRbpVWjS7T7SPRXkLBLizd9RsjiAT5wMxA6ufF9UYhm_t-tA793Sbt9sMMzeSNfv7XDMbf9LFPun0mWzoCXU7o6pC3VUyeN6MARik502kEJhMSW9xnOCRlbaqbpDQM')" }}></div>
                                        <div>
                                            <p className="font-bold text-[#111318] dark:text-white">Elena R.</p>
                                            <p className="text-xs text-gray-500">Digital Marketing Manager</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">"The Google Ads certification was the key. It proved I knew my stuff before I even walked into the interview. Got a 30% hike!"</p>
                                </div>
                                {/* Testimonial 2 */}
                                <div className="min-w-[85vw] md:min-w-0 snap-center p-6 rounded-xl bg-[#f6f6f8] dark:bg-[#101622] border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-12 rounded-full bg-cover bg-center" data-alt="Portrait of male student" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHH5JUh-cM--cmvh6I4dEqKfRmlD7T3V85Y1Ni8kdYegH67WdebATNcqjiaJtFlwKVb8PYxNxXwEwHD2inc9jSPYGzcSSKRw1ob9JTSN2yE1eXZJ3_jHHdI3pfkzoWylBiwuFPqoXO52CIYPha91HAihEqa5Fse6WVA0rwG91urr-wCvA-hROiQIcw0-DQuki0Aww8ZY8EGm_sqKbzCuiNDFAPfitGonqrwET_vI8vltJTDDKCQ5WJabPOuAxQJPFtdHn-SXL4U6g')" }}></div>
                                        <div>
                                            <p className="font-bold text-[#111318] dark:text-white">Marcus T.</p>
                                            <p className="text-xs text-gray-500">SEO Specialist</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">"Recruiters actively looked for the SEMrush badge on my LinkedIn. It shortened my job hunt from months to weeks."</p>
                                </div>
                                {/* Testimonial 3 */}
                                <div className="min-w-[85vw] md:min-w-0 snap-center p-6 rounded-xl bg-[#f6f6f8] dark:bg-[#101622] border border-gray-100 dark:border-gray-800 hidden lg:block">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-12 rounded-full bg-cover bg-center" data-alt="Portrait of female student" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYzXOg7DrNObUHBx93Pz6QlZNwEZqsB8FVOtT0I_OETifAL7-Mhn1IZCWPrgbHBa9vn5nr1UcCzH7VpCnc7HKLcNUbbjG5DsU0sXAKJg11p1utU6LXVlantebbk4VArTqJfcnH5_eJhOnQ43vWXsoQDw6GnDtTlRDQxTinvL_jShJjjn99HEf5CKWPhtTqPzXbI6DbpVix5IREJuiFgbSqb1y3uYwUqpD0pabRIaOyV2siNMWvl8s_cNC5RJsoQepjAxG938pr_Fg')" }}></div>
                                        <div>
                                            <p className="font-bold text-[#111318] dark:text-white">Sarah L.</p>
                                            <p className="text-xs text-gray-500">Content Strategist</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">"The practical assignments were tough, but the certificate is respected everywhere. Totally worth the effort."</p>
                                </div>
                            </div>
                        </div>
                        {/* Employer Validation */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <div className="inline-block px-3 py-1 mb-4 rounded bg-blue-100 dark:bg-blue-900/30 text-[#135bec] text-xs font-bold uppercase tracking-wide">Recruiter's Perspective</div>
                                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-4">"We trust these certifications."</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-0">
                                    "When we see a candidate from Digital Institute, we know they have hands-on experience, not just theory. It saves us time in technical rounds."
                                </p>
                                <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
                                    <div className="size-10 bg-gray-300 rounded-full bg-cover bg-center" data-alt="HR Manager portrait" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVC0P0rlWlIe_1ICXbr9HflrwZiVvN8aCluDLpY9lv3XMA8gauZjtc5Xh2mZiqwyAgOkEUho7F8lHvjGsodiomizew1EombW1_qwOuVVJn6wfXjkGN_tpyEj7bOdIl02Owv1-ctwGL_9SwOHnNlBzd375l8CSYiyyhjrRYdI97jsH9vo_xAvUA8WBiuWh_Z5h7fBzcxD_pSk3rRr4kdH2TxC30kZksWdNbr6BI5BNzjzD8KmGXZRlvQef-y24QDrOow7dim0c-l44')" }}></div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-[#111318] dark:text-white">James Wilson</p>
                                        <p className="text-xs text-gray-500">HR Director, TechFlow Inc.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full max-w-sm bg-white dark:bg-[#1a2332] p-6 rounded-xl shadow-lg">
                                <h4 className="font-bold text-[#111318] dark:text-white mb-4">Check Certificate Validity</h4>
                                <p className="text-xs text-gray-500 mb-4">Enter the certificate ID to verify authenticity.</p>
                                <div className="flex gap-2">
                                    <input className="flex-1 h-10 px-3 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-sm dark:text-white placeholder-gray-400 focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] outline-none" placeholder="e.g. CERT-2023-889" type="text" />
                                    <button className="h-10 px-4 bg-[#135bec] text-white text-sm font-bold rounded">Verify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <FAQs />

                {/* Sticky Conversion Assist */}
                <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white dark:bg-[#1a2332] border-t border-gray-200 dark:border-gray-800 md:bg-transparent md:dark:bg-transparent md:border-none md:bottom-8 md:right-8 md:left-auto md:p-0">
                    <div className="flex gap-3 md:flex-col items-stretch md:items-end">
                        {/* WhatsApp Button */}
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-12 md:h-14 px-6 rounded-lg bg-[#25D366] text-white font-bold shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-105">
                            <span className="material-symbols-outlined">chat</span>
                            <span className="md:hidden">Change</span>
                            <span className="hidden md:inline">WhatsApp Us</span>
                        </button>
                        {/* Apply Sticky Button */}
                        <a href="/free-counseling" className="flex-[2] md:flex-none flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-lg bg-[#135bec] text-white font-bold shadow-lg shadow-[#135bec]/30 hover:bg-blue-700 transition-transform hover:scale-105">
                            <span>Apply Now</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}

function FAQs() {
    return (
        <section className="py-10 lg:py-16 bg-[#f6f6f8] dark:bg-[#101622]">
            <div className="max-w-[800px] mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-[#111318] dark:text-white mb-10">Frequently Asked Questions</h2>
                <div className="flex flex-col gap-4">
                    <DetailsSummary question="Do these certifications expire?">
                        Most certifications like the Digital Institute Master Certification have lifetime validity. However, third-party certifications like Google Ads or Analytics may require annual renewal exams which are free of cost.
                    </DetailsSummary>
                    <DetailsSummary question="Can I add these to my LinkedIn profile?">
                        Absolutely! We provide a one-click "Add to LinkedIn" feature with your digital certificate. It appears under the Licenses & Certifications section of your profile.
                    </DetailsSummary>
                    <DetailsSummary question="What if I fail the assessment exam?">
                        Don't worry. You get 2 additional re-attempt opportunities at no extra cost. Our mentors will also conduct a review session to help you understand where you need to improve.
                    </DetailsSummary>
                    <DetailsSummary question="Are these recognized internationally?">
                        Yes, our curriculum is aligned with global standards. We also prepare you for platform-specific certifications (like Meta & Google) which are universally recognized regardless of location.
                    </DetailsSummary>
                </div>
            </div>
        </section>
    );
}

function DetailsSummary({ question, children }: { question: string, children: React.ReactNode }) {
    return (
        <details className="group bg-white dark:bg-[#1a2332] rounded-lg border border-gray-200 dark:border-gray-700 open:border-[#135bec] dark:open:border-[#135bec] transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-medium text-[#111318] dark:text-white">
                <span>{question}</span>
                <span className="transition group-open:rotate-180 material-symbols-outlined">expand_more</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                {children}
            </div>
        </details>
    );
}


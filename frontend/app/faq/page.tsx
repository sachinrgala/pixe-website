"use client";

import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";

const FAQ_CATEGORIES = [
    { id: "all", label: "All FAQs", icon: "help" },
    { id: "program", label: "Program", icon: "school" },
    { id: "fees", label: "Fees & EMI", icon: "payments" },
    { id: "placement", label: "Placement", icon: "work" },
    { id: "internship", label: "Internship", icon: "business_center" },
    { id: "mode", label: "Mode & Schedule", icon: "schedule" },
    { id: "eligibility", label: "Eligibility", icon: "verified_user" },
    { id: "certification", label: "Certification", icon: "workspace_premium" }
];

const ALL_FAQS = [
    // Program FAQs
    { category: "program", question: "What is the duration of the Advanced Digital Marketing course?", answer: "The Advanced Digital Marketing course is a comprehensive 16-week program. It includes 12 weeks of intensive training followed by 4 weeks of hands-on internship. Classes are held 3 times a week (Mon/Wed/Fri or Tue/Thu/Sat) for 2 hours each session. Total learning hours: 100+ hours of live sessions plus 50+ hours of project work.", priority: true },
    { category: "program", question: "What topics are covered in the curriculum?", answer: "Our curriculum covers 15+ modules including: SEO (Technical + On-page + Off-page), Google Ads & PPC, Meta Ads (Facebook/Instagram), Social Media Marketing, Content Marketing, Email Marketing, Google Analytics 4, Marketing Automation, WordPress & Landing Pages, Conversion Rate Optimization, Affiliate Marketing, E-commerce Marketing, YouTube Marketing, Influencer Marketing, and AI Tools for Marketing.", priority: true },
    { category: "program", question: "Do I get access to recorded sessions?", answer: "Yes! All live sessions are recorded and uploaded to your student dashboard within 4 hours. You have lifetime access to these recordings even after course completion. Additionally, you get access to supplementary video tutorials, case studies, and resource libraries.", priority: false },
    { category: "program", question: "What tools will I learn during the program?", answer: "You'll get hands-on experience with 25+ industry tools including: Google Analytics 4, Google Ads, Meta Business Suite, Semrush, Ahrefs, HubSpot, Mailchimp, Canva, WordPress, Google Tag Manager, Looker Studio, Hotjar, Screaming Frog, Ubersuggest, and more. We provide free access/trials for all tools during training.", priority: false },
    { category: "program", question: "Is there a syllabus I can download?", answer: "Absolutely! You can download our detailed syllabus with module-wise breakdown, learning outcomes, and project descriptions from our website. Click the 'Download Syllabus' button on the course page or request it from our counselor.", priority: false },
    { category: "program", question: "How is this course different from free YouTube tutorials?", answer: "Unlike scattered YouTube content, our program offers: 1) Structured curriculum designed by industry experts, 2) Hands-on projects with real ad budgets (₹50,000+ worth), 3) Live doubt-solving sessions, 4) Industry-recognized certification, 5) Placement assistance, 6) Personal mentorship, 7) Access to our hiring partner network. Free content gives knowledge; we give you career transformation.", priority: true },

    // Fees & EMI FAQs
    { category: "fees", question: "What is the total course fee?", answer: "The Advanced Digital Marketing course fee is ₹49,999 (inclusive of GST). This includes all training modules, internship, certification exam, placement support, and lifetime access to resources. Early bird discount of ₹5,000 is available for enrollments within 7 days of inquiry.", priority: true },
    { category: "fees", question: "What EMI options are available?", answer: "We offer multiple EMI options: 1) No-Cost EMI: 3, 6, or 12 month plans at 0% interest through partner NBFCs (Bajaj Finserv, HDFC, ICICI), 2) Low-Cost EMI: Up to 24 months with minimal interest, 3) Pay After Placement: Pay 50% upfront, rest after you get a job. Minimum EMI starts at ₹2,999/month.", priority: true },
    { category: "fees", question: "Do you offer scholarships or financial aid?", answer: "Yes! We have 4 scholarship categories: 1) Merit Scholarship (up to 50% off for toppers), 2) Need-Based Aid (up to ₹40,000 for EWS students), 3) Women in Tech (₹20,000 for female students), 4) Early Bird Discount (₹15,000 off). You can apply through our scholarship page with supporting documents.", priority: true },
    { category: "fees", question: "Are there any hidden charges?", answer: "Absolutely not. The fee you see is the fee you pay. No registration charges, no exam fees, no material charges, no placement fees, no certification charges. Everything is included in the course fee. We believe in 100% transparent pricing.", priority: true },
    { category: "fees", question: "What payment methods do you accept?", answer: "We accept all major payment methods: Credit/Debit cards, Net Banking, UPI (GPay, PhonePe, Paytm), Bank transfers (NEFT/RTGS/IMPS), Cheques, and EMI through partner NBFCs. International students can pay via PayPal or wire transfer.", priority: false },
    { category: "fees", question: "Can I get a refund if I'm not satisfied?", answer: "We offer a 7-day money-back guarantee. If you attend the first week of classes and feel the program isn't right for you, we'll refund your entire fee (minus processing charges of ₹2,000). No questions asked. This is because we're confident in our program quality.", priority: false },
    { category: "fees", question: "Is there a fee for the certification exam?", answer: "No, the certification exam fee is included in your course fee. You get 2 attempts to clear the exam. If you need a third attempt, there's a nominal fee of ₹1,000. Most students clear it in the first attempt itself (92% pass rate).", priority: false },

    // Placement FAQs
    { category: "placement", question: "Is there a 100% job guarantee?", answer: "We provide 100% Placement Assistance, not a 'guarantee' (which is often misleading). This includes: Resume building, LinkedIn optimization, mock interviews, soft skills training, and exclusive access to 350+ hiring partners. 92% of our certified graduates get placed within 90 days. We support you until you get hired, even if it takes longer.", priority: true },
    { category: "placement", question: "What is the average salary package after the course?", answer: "Our graduates' packages vary based on experience & location: Freshers: ₹3-5 LPA, 1-2 years experience: ₹5-8 LPA, Experienced professionals: ₹8-15 LPA. The highest package placed was ₹18 LPA (Performance Marketing role). Average starting package is ₹4.5 LPA.", priority: true },
    { category: "placement", question: "Which companies hire from your institute?", answer: "Our 350+ hiring partners include: Agencies (Dentsu, Ogilvy, GroupM, Isobar), Startups (Zomato, Swiggy, Nykaa, Urban Company, CRED), MNCs (Amazon, Flipkart, Google Partners, Meta Partners), IT Companies (TCS, Infosys, Wipro, Cognizant), and numerous SMBs & D2C brands. We share the updated list during counseling.", priority: true },
    { category: "placement", question: "How long does it take to get placed?", answer: "On average, students get placed within 45-60 days of course completion. Top performers often get pre-placement offers during the internship itself. Our placement support continues for 1 year after course completion, and we never stop until you're placed.", priority: false },
    { category: "placement", question: "Do you provide placement support for other cities?", answer: "Yes! Our hiring partner network spans across India including Delhi-NCR, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, and Tier-2 cities. We also have remote job opportunities for students preferring work-from-home roles.", priority: false },
    { category: "placement", question: "What job roles can I apply for after the course?", answer: "You can apply for various roles: Digital Marketing Executive, SEO Specialist, PPC/SEM Specialist, Social Media Manager, Content Marketing Manager, Email Marketing Specialist, Performance Marketing Analyst, Growth Marketing Associate, Marketing Automation Specialist, and Digital Marketing Manager.", priority: false },
    { category: "placement", question: "Will you help me if I don't get placed immediately?", answer: "Absolutely! Unlike others who abandon students after a few months, we provide lifelong placement support. If you're not placed within 6 months, we offer free refresher sessions, additional mock interviews, and priority access to new job postings. Your success is our reputation.", priority: false },

    // Internship FAQs
    { category: "internship", question: "Is the internship mandatory?", answer: "Yes, the 4-week internship is a mandatory part of the program. It's what differentiates our graduates from others. You'll work on live projects with real budgets (₹50,000+ ad spend), not simulations. This hands-on experience is what makes you job-ready.", priority: true },
    { category: "internship", question: "Will I work on real projects or case studies?", answer: "100% real projects! During internship, you'll work on actual client campaigns including: Running Google/Meta ads with real budgets, SEO optimization for live websites, Social media management for real brands, Email campaign execution, Analytics reporting for stakeholders. These become portfolio pieces for your resume.", priority: true },
    { category: "internship", question: "What companies offer internship projects?", answer: "Our internship projects come from: Our in-house digital agency clients, Partner startups & SMBs, E-commerce brands, Local businesses going digital, and NGOs for social impact projects. Past projects have included brands like BoAt, MamaEarth, Bewakoof, and many D2C startups.", priority: false },
    { category: "internship", question: "Is the internship paid?", answer: "The internship during the course is an unpaid learning experience (you're learning, not earning yet). However, top performers (top 10%) get stipends of ₹5,000-10,000/month. Post-course, if you continue as a junior team member, paid internships of ₹15,000-25,000/month are available based on performance.", priority: false },
    { category: "internship", question: "How many hours per week is the internship?", answer: "The internship requires 15-20 hours per week commitment. It's designed to be flexible for working professionals. You can work on projects in the evenings or weekends. All tasks have reasonable deadlines and mentors are available for guidance.", priority: false },

    // Mode & Schedule FAQs
    { category: "mode", question: "Is the course online or offline?", answer: "We offer both modes: 1) Live Online: Interactive Zoom sessions with real-time Q&A, screen sharing, and breakout rooms. 2) Offline (Classroom): In-person training at our centers in Delhi, Mumbai, and Bangalore. 3) Hybrid: Attend some sessions online, some offline. All modes have the same curriculum and placement support.", priority: true },
    { category: "mode", question: "What are the batch timings?", answer: "We have multiple batch options to suit your schedule: Weekday Morning: 10 AM - 12 PM (Mon/Wed/Fri), Weekday Evening: 7 PM - 9 PM (Tue/Thu/Sat), Weekend Only: 10 AM - 1 PM & 2 PM - 5 PM (Sat/Sun). You can switch batches mid-course if needed (subject to availability).", priority: true },
    { category: "mode", question: "Can working professionals join the course?", answer: "Absolutely! 60% of our students are working professionals. Our evening and weekend batches are designed specifically for you. The course requires 8-10 hours/week including classes and assignments. Many students study while working full-time and successfully complete the program.", priority: true },
    { category: "mode", question: "What if I miss a live session?", answer: "No worries! All sessions are recorded. You'll get access to the recording within 4 hours. You can also attend a doubt-clearing session in another batch the same week. If you miss more than 3 consecutive sessions, your mentor will reach out to ensure you're on track.", priority: false },
    { category: "mode", question: "Is attendance mandatory?", answer: "We recommend at least 80% attendance for best learning outcomes. However, there's no penalty for missing sessions as all content is recorded. For certification, you need to complete all assignments and clear the final exam - attendance is secondary to demonstrated learning.", priority: false },
    { category: "mode", question: "Can I pause and resume the course?", answer: "Yes, we offer a one-time course pause option for up to 4 weeks. This is helpful if you have exams, travel, health issues, or work commitments. Your progress is saved, and you can rejoin the next batch from where you left off. No additional charges for this.", priority: false },

    // Eligibility FAQs
    { category: "eligibility", question: "Who can join this course?", answer: "The course is open to: Students (pursuing graduation or higher), Fresh graduates, Working professionals seeking upskilling, Career switchers from any background, Entrepreneurs & business owners, Freelancers, Anyone interested in digital marketing. No prior marketing experience needed - we start from basics.", priority: true },
    { category: "eligibility", question: "Is there an age limit?", answer: "Officially, you must be 18+ to enroll. There's no upper age limit. We've had successful students ranging from 18-year-old college students to 55-year-old business owners. Digital marketing is a skill for everyone, regardless of age.", priority: false },
    { category: "eligibility", question: "Do I need any prior technical knowledge?", answer: "No technical background is required. If you can use a smartphone and browse the internet, you're qualified! We teach everything from scratch. Basic computer skills (browsing, typing, using spreadsheets) are helpful but not mandatory.", priority: true },
    { category: "eligibility", question: "Do I need a laptop for the course?", answer: "Yes, a personal laptop is required for practical work. Minimum specs: Intel i3 or equivalent, 4GB RAM (8GB recommended), 100GB free storage, stable internet (10 Mbps+), and Chrome browser. MacBooks, Windows, or Linux all work. If you don't have one, we can help with affordable rental options.", priority: false },
    { category: "eligibility", question: "Is this course suitable for non-English speakers?", answer: "Our primary instruction is in English, but we accommodate Hindi-speaking students with bilingual support. Complex concepts are often explained in Hindi during live sessions. All written materials are in English as that's the industry standard.", priority: false },
    { category: "eligibility", question: "Can I join if I'm from a non-marketing background?", answer: "Absolutely! Our strongest placements often come from non-marketing backgrounds - engineers, accountants, designers, teachers. Digital marketing values analytical thinking and creativity over traditional marketing degrees. We've placed students from 50+ different educational backgrounds.", priority: false },

    // Certification FAQs
    { category: "certification", question: "What certification will I receive?", answer: "Upon completion, you receive: 1) Pixe Digital Marketing Master Certification (16 modules), 2) Google Analytics Certification (official), 3) Meta Blueprint Certification (official), 4) HubSpot Inbound Marketing Certification (official), 5) Project completion certificates. All certificates are verifiable online.", priority: true },
    { category: "certification", question: "Is the certification industry-recognized?", answer: "Yes! Our certification is recognized by 350+ hiring partners across India. Additionally, the Google, Meta, and HubSpot certifications you earn are globally recognized official certifications. Many MNCs specifically look for these certifications when hiring.", priority: true },
    { category: "certification", question: "How is the certification exam conducted?", answer: "The exam is online and can be taken from home. It consists of: 100 MCQ questions, 2-hour duration, 70% passing score required. It's open-book (you can refer to notes), but it tests practical application, not memorization. You get 2 free attempts included in your fee.", priority: false },
    { category: "certification", question: "Do certificates expire?", answer: "Our Pixe certification doesn't expire - it's a lifetime credential with a unique verification code. However, Google and Meta certifications require annual renewal (free exam retake). This ensures your knowledge stays current with platform updates.", priority: false },
    { category: "certification", question: "Can I add these certifications to LinkedIn?", answer: "Absolutely! All our certificates come with LinkedIn-compatible badges and unique verification URLs. We guide you on how to add them to your LinkedIn profile during the course itself. Many students report increased profile views and recruiter messages after adding certifications.", priority: false },

    // Miscellaneous High-Priority FAQs
    { category: "program", question: "What if I'm not satisfied with the teaching quality?", answer: "We're confident in our trainers (all 5+ years industry experience), but if you're unsatisfied, you can: 1) Switch to a different trainer's batch, 2) Request additional support sessions, 3) Use our 7-day refund policy. Student satisfaction rate is 4.8/5 based on 2000+ reviews.", priority: true },
    { category: "fees", question: "Can I pay the fee in installments without EMI?", answer: "Yes! Beyond formal EMI, we offer a simple 2-part payment: 50% at enrollment, 50% before internship starts. No interest, no documentation, no credit check. This is ideal for students who don't want EMI but need flexible payments.", priority: false },
    { category: "placement", question: "What support do you provide for freelancing instead of jobs?", answer: "We fully support the freelancing path! You'll learn: How to find clients (Upwork, Freelancer, direct outreach), Pricing your services, Building a portfolio website, Contract & invoice management, Client communication. Many students earn ₹30,000-50,000/month freelancing within 6 months of completion.", priority: false }
];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    const filteredFaqs = ALL_FAQS.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const priorityFaqs = filteredFaqs.filter(faq => faq.priority);
    const otherFaqs = filteredFaqs.filter(faq => !faq.priority);

    return (
        <div className="min-h-screen bg-background text-foreground font-body selection:bg-orange-500/20 selection:text-orange-600">

            {/* 1. Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-surface border-b border-border-color">
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-orange-800 mb-6">
                        <span className="material-symbols-outlined text-sm">help</span>
                        50+ Questions Answered
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
                        Got Questions? <span className="text-orange-600">We've Got Answers.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        Find answers about fees, placement, eligibility, internships, and more. Can't find what you're looking for? Talk to our counselors.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative mb-8">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for topics like fees, placement, eligibility..."
                            className="w-full h-14 pl-12 pr-4 bg-background border border-border-color rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none shadow-lg"
                        />
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {FAQ_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                        : 'bg-surface-deep border border-border-color text-foreground hover:border-orange-500/50 hover:text-orange-600'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. FAQ Content Area */}
            <section className="py-12 lg:py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left: FAQ Accordion */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Priority FAQs */}
                            {priorityFaqs.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-orange-600">local_fire_department</span>
                                        <h2 className="text-2xl font-bold">Most Asked Questions</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {priorityFaqs.map((faq, i) => (
                                            <details
                                                key={i}
                                                className="group bg-surface border border-border-color rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all"
                                                open={i === 0}
                                            >
                                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none hover:bg-surface-deep transition-colors">
                                                    <div className="flex items-start gap-3 pr-4">
                                                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-[10px] font-bold rounded uppercase">{faq.category}</span>
                                                        <h4 className="font-bold text-lg">{faq.question}</h4>
                                                    </div>
                                                    <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform shrink-0">expand_more</span>
                                                </summary>
                                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border-color/50 pt-4">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Other FAQs */}
                            {otherFaqs.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-muted-foreground">quiz</span>
                                        <h2 className="text-2xl font-bold">More Questions</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {otherFaqs.map((faq, i) => (
                                            <details
                                                key={i}
                                                className="group bg-surface border border-border-color rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all"
                                            >
                                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none hover:bg-surface-deep transition-colors">
                                                    <div className="flex items-start gap-3 pr-4">
                                                        <span className="px-2 py-1 bg-surface-deep text-muted-foreground text-[10px] font-bold rounded uppercase">{faq.category}</span>
                                                        <h4 className="font-bold text-lg">{faq.question}</h4>
                                                    </div>
                                                    <span className="material-symbols-outlined text-muted-foreground group-open:rotate-180 transition-transform shrink-0">expand_more</span>
                                                </summary>
                                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border-color/50 pt-4">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {filteredFaqs.length === 0 && (
                                <div className="text-center py-16 bg-surface rounded-2xl border border-border-color">
                                    <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4">search_off</span>
                                    <h3 className="text-xl font-bold mb-2">No FAQs found</h3>
                                    <p className="text-muted-foreground mb-6">Try a different search term or category</p>
                                    <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors">
                                        Reset Filters
                                    </button>
                                </div>
                            )}

                            {/* CTA Banner */}
                            <div className="mt-8 p-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                                    <p className="text-orange-100">Download our detailed brochure or talk to a counselor.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap">
                                        Download Brochure
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Sticky Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* Counselor CTA Card */}
                                <div className="bg-surface border border-border-color p-6 rounded-2xl shadow-lg">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Talk to a Counselor</h3>
                                            <p className="text-sm text-muted-foreground">Get personalized guidance</p>
                                        </div>
                                    </div>
                                    <Link href="/free-counseling" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors mb-4">
                                        Request a Call Back
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>

                                    <div className="border-t border-border-color pt-4">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Instant Support</p>
                                        <a href="https://wa.me/919876543210" className="flex items-center gap-3 p-3 rounded-xl border border-green-500 bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors group">
                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                                <span className="material-symbols-outlined">chat</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-foreground group-hover:text-green-600 transition-colors block">Chat on WhatsApp</span>
                                                <span className="text-xs text-muted-foreground">Replies in {"<"} 5 mins</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {/* Support Hours */}
                                <div className="bg-surface border border-border-color p-6 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-orange-600">schedule</span>
                                        <h4 className="font-bold">Support Hours</h4>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Mon - Sat</span>
                                            <span className="font-bold">9:00 AM - 7:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Sunday</span>
                                            <span className="font-bold">10:00 AM - 2:00 PM</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="bg-surface border border-border-color p-6 rounded-2xl">
                                    <h4 className="font-bold mb-4">Quick Links</h4>
                                    <div className="space-y-2">
                                        <Link href="/pricing" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-deep transition-colors group">
                                            <span className="text-sm font-medium">View Full Pricing</span>
                                            <span className="material-symbols-outlined text-sm text-muted-foreground group-hover:text-orange-600">arrow_forward</span>
                                        </Link>
                                        <Link href="/career" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-deep transition-colors group">
                                            <span className="text-sm font-medium">Placement Stats</span>
                                            <span className="material-symbols-outlined text-sm text-muted-foreground group-hover:text-orange-600">arrow_forward</span>
                                        </Link>
                                        <Link href="/internships" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-deep transition-colors group">
                                            <span className="text-sm font-medium">Internship Details</span>
                                            <span className="material-symbols-outlined text-sm text-muted-foreground group-hover:text-orange-600">arrow_forward</span>
                                        </Link>
                                        <Link href="/scholarships" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-deep transition-colors group">
                                            <span className="text-sm font-medium">Scholarship Options</span>
                                            <span className="material-symbols-outlined text-sm text-muted-foreground group-hover:text-orange-600">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border-color p-4 md:hidden z-50 flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <a href="https://wa.me/919876543210" className="flex-1 h-12 rounded-xl border border-green-500 bg-green-50 text-green-600 font-bold text-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-base">chat</span>
                    Chat
                </a>
                <Link href="/free-counseling" className="flex-1 h-12 rounded-xl bg-orange-600 text-white font-bold text-sm flex items-center justify-center">
                    Talk to Counselor
                </Link>
            </div>
            <div className="h-16 md:hidden"></div>

            <Footer />
        </div>
    );
}

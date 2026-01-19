import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#111318] border-t border-gray-800 text-white py-12">
            <div className="max-w-[1240px] mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">P</div>
                        <span className="font-bold text-xl tracking-tight">Pixe</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-400">
                        <Link href="/advance-digital-marketing-course" className="hover:text-white transition-colors">Courses</Link>
                        <Link href="/masterclass" className="hover:text-white transition-colors">Masterclass</Link>
                        <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
                        <Link href="/hire-talent" className="hover:text-white transition-colors">Hire Talent</Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center w-full mt-8 border-t border-gray-800 pt-8">
                        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Pixe Education. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0 text-gray-500 text-sm">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                            <Link href="/refund" className="hover:text-white transition-colors">Refund & Cancellation</Link>
                            <Link href="/website-map" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

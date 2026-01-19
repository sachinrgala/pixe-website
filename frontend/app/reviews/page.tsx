import { Footer } from "@/components/layout/Footer";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export default function ReviewsPage() {
    const testimonials = [
        {
            quote: "The practical approach to teaching is what sets Pixe apart. I launched my own agency just 3 months after completing the course.",
            name: "Rahul Sharma",
            role: "Founder @ DigitalGrowth",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzw4_1Qv0E927wO_qO8l_5F5x4z1bH7uY8kG6vT5eM4p9jL3nC2oD1sF0aX8r6qH3mI5lJ7kK9gN2P4tQ1wE8vR8uS3xY6zD7c5bA9f0G1hI2jK3L4mN6oP5qR8sT9uV7vW2xZ1aB0yC4d3eF5gH6iJ7k8lM9nO0pQ2rS1tU3vW4xY5zA6bC7dE8f9gH0iJ1k2lM3nO4pQ5rS6tU7vW8xY9zA0bC1dE2f3gH4iJ5k6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6f7gH8iJ9k0",
            rating: 5,
            location: "Delhi"
        },
        {
            quote: "Best investment for my career. The mentors are industry experts who actually care about your growth.",
            name: "Priya Patel",
            role: "Senior SEO Analyst",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2_9qR4tS8uV1wX7pL0mN5oK3jH9uG8vT6eM4p3jL2nC1oD0sF9aX7r6qH5mI4lJ3kK2gN1P0tQ9wE8vR7uS6xY5zD4c3bA2f1G0hI9jK8lM7nO6pQ5rS4tU3vW2xY1zA0bC9dE8f7gH6iJ5k4lM3nO2pQ1rS0tU9vW8xY7zA6bC5dE4f3gH2iJ1k0lM9nO8pQ7rS6tU5vW4xY3zA2bC1dE0f9gH8iJ7k6lM5nO4pQ3rS2tU1vW0xY9zA8bC7dE6f5",
            rating: 5,
            location: "Mumbai"
        },
        {
            quote: "I switched from a sales role to digital marketing. The transition was smooth thanks to the comprehensive curriculum.",
            name: "Amit Kumar",
            role: "Performance Marketer",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_8qS3tT7uV0wX6pK9mN4oJ2iG8uF7vS5dL3oI1nB0mC9sE8aW6qG5lH4kI3jJ2kL1gM0P9tQ8wD7vR6uS5xY4zC3bA1f0F9hH8jI7kL6mM5nO4pQ3rS2tU1vW0xY9zA8bC7dE6f5gH4iJ3k2lM1nO0pQ9rS8tU7vW6xY5zA4bC3dE2f1gH0iJ9k8lM7nO6pQ5rS4tU3vW2xY1zA0bC9dE8f7gH6iJ5k4lM3nO2pQ1rS0tU9vW8xY7zA6bC5dE4f3",
            rating: 5,
            location: "Bangalore"
        },
        {
            quote: "The live projects were the highlight. I actually managed real ad budgets before even graduating.",
            name: "Sneha Reddy",
            role: "PPC Executive",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_BSmArn3viF55BzUnmoCynP8vH7EUM3kl1WbHjmxCCPStaZi7-4kc4p5wNZKfid73K1ELqgUEs0zNcICXswuAJk1Q0DjOPeH3PYcpHMs2eK0chDf-f96E6eiH3wC_q7neP46F2_WiIFrDjteZCb8gTyeyV8i-6BKVNkcmibzzCKPAQptzubyHOfTq9OiW32BYAQaPhhasVi10pl_CTYELOx-zF5LFBBMO25x96MjKEnt05mq6i5QpKYtr-Vv1IfPwulSJAOlgcQc",
            rating: 5,
            location: "Hyderabad"
        },
        {
            quote: "Highly recommended for anyone looking to upskill. The certification holds real value in the industry.",
            name: "Vikram Singh",
            role: "Marketing Manager",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCjyAt7dJfzLZpPLl1UXG99HhrW7Nkx5l6ByeeTqjR2CpDDKhoHXuB_gHEJ_fGnVi5Fps81IaC4nu23vfb03_rc6kTouCjI-2z_OZHeOlOCdClEye-A4r8CR97A8xRaeXubKd5vhPLHNU9nqzefM4E_4biU0r5bQXIv1s7orJz1K1Z3amr0zS506Yl0KLpJgRtNYwrNFZshYNGuF-geab2oQu0PJT7QsK05BT8q1Aag3DvZtz7BzO-1cr3WWZcL2UaSDY_WcuV6Lk",
            rating: 4,
            location: "Pune"
        },
        {
            quote: "The placement support is genuine. They helped me prep for interviews and I got placed within 2 weeks.",
            name: "Anjali Gupta",
            role: "Content Strategist",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzw4_1Qv0E927wO_qO8l_5F5x4z1bH7uY8kG6vT5eM4p9jL3nC2oD1sF0aX8r6qH3mI5lJ7kK9gN2P4tQ1wE8vR8uS3xY6zD7c5bA9f0G1hI2jK3L4mN6oP5qR8sT9uV7vW2xZ1aB0yC4d3eF5gH6iJ7k8lM9nO0pQ2rS1tU3vW4xY5zA6bC7dE8f9gH0iJ1k2lM3nO4pQ5rS6tU7vW8xY9zA0bC1dE2f3gH4iJ5k6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6f7gH8iJ9k0",
            rating: 5,
            location: "Noida"
        }
    ];

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#101622] min-h-screen font-display text-[#111318] dark:text-white">

            <main>
                {/* Header */}
                <div className="bg-white dark:bg-[#1a202c] border-b border-[#dbdfe6] dark:border-gray-800 py-16 md:py-24 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Student Reviews</h1>
                    <p className="text-[#616f89] dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from the thousands of students who have transformed their careers with us.
                    </p>
                    <div className="flex justify-center gap-6 mt-8">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-[#111318] dark:text-white">4.8/5</span>
                            <span className="text-sm text-[#616f89]">Google Reviews</span>
                        </div>
                        <div className="w-px bg-gray-300 dark:bg-gray-700 h-12"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-[#111318] dark:text-white">100+</span>
                            <span className="text-sm text-[#616f89]">Success Stories</span>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={i} {...t} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-[#135bec] text-white py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to write your own success story?</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/courses" className="bg-white text-[#135bec] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                                Explore Courses
                            </a>
                            <a href="/free-counseling" className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                                Talk to a Counselor
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

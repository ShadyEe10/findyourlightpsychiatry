import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import BlogPostCard from "@/components/BlogPostCard";

export const metadata: Metadata = {
  title: "Mental Health Blog - Find Your Light Psychiatry PLLC",
  description: "Insights, articles, and resources to support your journey towards mental wellness from Find Your Light Psychiatry.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Mental Health Blog - Find Your Light Psychiatry PLLC",
    description: "Evidence-based articles covering therapy, ADHD, adjustment disorders, seasonal wellness, and more.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Light Psychiatry Blog",
    description: "Weekly mental health insights and resources from April Casselman, PMHNP-BC.",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl md:text-4xl">🪴</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-3 sm:mb-4 tracking-tight px-4">
            Find Your Light
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-gray-700 mb-4 sm:mb-6 tracking-wide px-4">
            Blog Highlights
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Insights, articles, and resources to support your journey towards mental wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {BLOG_POSTS && BLOG_POSTS.length > 0 ? (
            BLOG_POSTS.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No blog posts available at this time.</p>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-relaxed mb-4 sm:mb-6 font-light px-4">
              Ready to take your next step toward healing?
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 px-4">
              Schedule a consultation today with Find Your Light Psychiatry.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#059669] text-white rounded-2xl hover:bg-[#047857] transition-all duration-500 ease-out font-semibold text-base sm:text-lg shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.4)] transform hover:-translate-y-1.5 min-h-[52px] flex items-center justify-center mx-4 sm:mx-0"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

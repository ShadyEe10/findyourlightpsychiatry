"use client";

import { useState, memo } from "react";
import Image from "next/image";
import type { BlogPost } from "@/data/blogPosts";

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const BlogPostCard = memo(({ post }: { post: BlogPost }) => {
  const [imageError, setImageError] = useState(false);
  
  // Safety checks for post data
  if (!post || !post.title) {
    return null;
  }
  
  const readMoreLink = post.readMoreLink || '#';
  const imageUrl = post.imageUrl || '';
  const imageAlt = post.imageAlt || post.title || 'Blog post image';
  const category = post.category || 'Article';
  const date = post.date || '';
  const description = post.description || '';
  
  // Prevent navigation if link is invalid
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!readMoreLink || readMoreLink === '#') {
      e.preventDefault();
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col h-full">
      <a 
        href={readMoreLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block flex flex-col h-full"
        onClick={handleLinkClick}
      >
        {/* Image on top of each blog post */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-50 overflow-hidden flex-shrink-0">
          {!imageError && imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-4xl sm:text-5xl mb-2">📖</div>
                <div className="text-white font-semibold text-xs sm:text-sm drop-shadow-lg">{category}</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-end">
            <span className="inline-block bg-[#059669]/90 text-white text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {date && (
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-500 text-xs sm:text-sm">{date}</span>
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#059669] transition-colors duration-300 min-h-[3.5rem] line-clamp-2">
            {post.title}
          </h3>
          {description && (
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3 flex-grow">
              {description}
            </p>
          )}
          <div className="flex items-center font-semibold text-[#059669] mt-auto text-sm sm:text-base min-h-[44px]">
            Read More
            <ArrowRightIcon />
          </div>
        </div>
      </a>
    </div>
  );
});

BlogPostCard.displayName = "BlogPostCard";

export default BlogPostCard;


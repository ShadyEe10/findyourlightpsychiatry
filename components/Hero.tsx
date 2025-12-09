import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  text?: string;
  imageSrc: string;
  imageAlt?: string;
  backgroundImage?: string;
}

const Hero = ({ title, subtitle, text, imageSrc, imageAlt, backgroundImage }: HeroProps) => {
  // Safety checks
  if (!title) return null;
  const safeImageSrc = imageSrc || '/images/April-Casselman_Portrait.jpeg';
  const safeImageAlt = imageAlt || 'Hero image';
  
  return (
    <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12 lg:py-16 overflow-hidden">
      {/* Background Image with Enhanced Blending - Only covers hero section */}
      {backgroundImage && typeof backgroundImage === 'string' && (
        <div className="absolute inset-0 z-0 h-full" aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          {/* Reduced overlay stack to improve paint performance */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-white/20"></div>
          {/* Edge fades */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Title and Subtitle - Centered with refined spacing */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-script text-[#D4AF37] mb-2 sm:mb-3 md:mb-4 leading-[0.95] tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3),_0_0_8px_rgba(255,255,255,0.5)]">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif text-gray-900 font-light tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] px-4">
              {subtitle}
            </h2>
          )}
        </div>

        {/* Two-column layout: Image and Text with fluid spacing */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
          {/* Image Column (Left) - Larger, more prominent portrait */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start order-2 lg:order-1 lg:-ml-4">
            <Link href="/about" className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-[3/4] transform hover:scale-[1.02] transition-all duration-700 ease-out cursor-pointer block">
              {/* Rectangular container with soft rounded corners - minimal edge fade for visibility */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                {safeImageSrc && (
                  <Image 
                    src={safeImageSrc} 
                    alt={safeImageAlt} 
                    fill
                    className="object-cover"
                    priority 
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 45vw, 40vw"
                    style={{ 
                      objectPosition: 'center 30%'
                    }}
                  />
                )}
                {/* Minimal edge fade overlays for better portrait visibility */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white/10 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/12 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/8 to-transparent"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* Text Column (Right) - Smoothly blended card */}
          <div className="w-full lg:w-3/5 space-y-5 sm:space-y-6 md:space-y-7 flex flex-col justify-center order-1 lg:order-2">
            {text && (
              <div className="bg-white/55 backdrop-blur-lg rounded-3xl p-7 sm:p-9 md:p-11 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 hover:bg-white/65 transition-all duration-500 relative overflow-hidden">
                {/* Subtle gradient overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/15 pointer-events-none rounded-3xl"></div>
                <div className="relative z-10">
                <div className="text-gray-900 leading-relaxed space-y-5 sm:space-y-6">
                  {text && typeof text === 'string' ? (
                    text.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                      <p 
                        key={index} 
                        className={`text-sm sm:text-base md:text-lg lg:text-xl leading-[1.85] ${
                          index === 0 
                            ? 'font-medium text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl' 
                            : 'text-gray-800 font-light'
                        }`}
                      >
                        {paragraph.split('**').map((part, i) => 
                          i % 2 === 1 ? (
                            <strong key={i} className="font-semibold text-gray-900">{part}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    ))
                  ) : null}
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { RoughNotation } from "react-rough-notation";

import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";
import { MdxMeta } from "pages/blog/posts/[slug]";
import BlogImageCard from "@/components/BlogImageCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  posts: MdxMeta[];
};

const BlogSection: React.FC<Props> = ({ posts }) => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for blog section
  const blogSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    blogSection && onSectionChange!("blog");
  }, [blogSection]);

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#1B2731]">
      <section ref={sectionRef} id="blog" className="section md:px-10">
        <div className="text-center">
          <RoughNotation
            type="underline"
            color={`${
              theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"
            }`}
            strokeWidth={2}
            order={1}
            show={isOnScreen}
          >
            <h2 className="section-heading">Blog</h2>
          </RoughNotation>
        </div>
        <div className="text-center mb-8" ref={elementRef}>
          I write blogs about my trips, lifestyle
          <br className="hidden sm:block" aria-hidden="true" />
          and football.
        </div>
        <div className="flex justify-center w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{
              dynamicBullets: true,
            }}
            wrapperTag="ul"
            navigation
            className="swiper-padding-mobile xs:swiper-padding px-8 md:px-16"
            style={{ maxWidth: '900px', width: '100%' }}
            breakpoints={{
              100: {
                slidesPerView: 1,
                spaceBetween: 32,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 48,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 64,
                centeredSlides: true,
              },
            }}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={post.slug} tag="li" style={{ display: 'flex', justifyContent: 'center' }}>
                <BlogImageCard
                  post={post}
                  className={`${index > 3 ? "hidden lg:block" : ""}`}
                  key={post.slug}
                  fullWH
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-4 text-center">
          <Link href="/blog" className="link">
            Read all blog posts{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;

import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {featuredBlog, secondaryBlogs} from "../data/blog";
import BlogImg from "../styles/images/BlogImg.jpg"
const allBlogs = [featuredBlog, ...secondaryBlogs];

export default function BlogDetail() {
  const { slug } = useParams();

  const blog = allBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl">Article not found</h2>
        <Link to="/blog" className="text-primary mt-4 inline-block">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-background">
      {/* HERO */}
      <div className="relative overflow-hidden pt-32 md:pt-36 min-h-[70vh] lg:min-h-[85vh]">
        {/* RIGHT SIDE IMAGE */}
        <div className="absolute top-0 right-0 w-[55%] hidden md:block rounded-3xl">
          <img
            src={BlogImg}
            alt="Blog background"
            className="h-full w-full object-cover opacity-80 rounded-l-[32px]"
          />
        </div>

        {/* SOFT OVERLAY */}
        <div
          className="absolute inset-0 bg-gradient-to-r 
                  from-background via-background/85 to-transparent"
        />

        {/* SUBTLE RADIAL GLOW */}
        <div
          className="absolute right-[-20%] top-1/2 h-[500px] w-[500px]
                  -translate-y-1/2 rounded-full
                  bg-primary/10 blur-3xl"
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full
                     border border-primary/30
                     text-primary bg-white/80 backdrop-blur"
              >
                {tag}
              </span>
            ))}
            {blog.readTime && (
              <span
                className="px-3 py-1 text-xs rounded-full
                         border border-primary/20
                         text-muted bg-white/80 backdrop-blur"
              >
                {blog.readTime}
              </span>
            )}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-lg text-muted max-w-2xl">{blog.excerpt}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-16">
        {/* ARTICLE BODY */}
        <article
          className="
    lg:col-span-2
    max-w-[68ch]
    prose prose-lg
    prose-headings:font-heading
    prose-headings:text-dark
    prose-h2:mt-14
    prose-h2:mb-4
    prose-p:leading-[1.9]
    prose-p:text-muted
    prose-p:my-6
    prose-strong:text-dark
    prose-ul:my-6
    prose-li:my-2
  "
        >
          {" "}
          <p>
            Your blog content goes here. This can later be rendered from
            markdown, a CMS, or a rich text editor.
          </p>
          <p>
            The goal is to keep reading effortless — generous spacing, calm
            typography, and minimal distractions.
          </p>
          <h2 id="clarity-matters">Why clarity matters</h2>
          <p>
            Clarity allows decisions to become easier. When systems and
            messaging are aligned, growth becomes sustainable.
          </p>
          <h2 id="focus-on-next">What to focus on next</h2>
          <p>
            Instead of doing more, focus on designing systems that support your
            life and values.
          </p>
        </article>

        {/* SIDEBAR */}
        <aside className="relative space-y-10 lg:pl-12 border-l border-primary/10 ">
          {/* TOC */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-4">
              On this page
            </h4>
            <ul className="space-y-3 text-sm ">
              <li className="text-muted hover:text-dark trasition cursor-pointer">
                Introduction
              </li>
              <li className="text-muted hover:text-dark trasition cursor-pointer">
                Why clarity matters
              </li>
              <li className="text-muted hover:text-dark trasition cursor-pointer">
                What to focus on next
              </li>
            </ul>
          </div>

          {/* AUTHOR CARD */}
          <div className="rounded-2xl border border-primary/15 bg-white/70 p-6">
            <p className="text-xs uppercase tracking-wider mb-2">Written by</p>
            <p className="font-medium text-dark">Ruchi Dolikar</p>
            <p className="text-xs text-muted mt-1">
              Digital Business Mentor & Strategist
            </p>
          </div>

          {/* BACK CTA */}
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-primary font-medium pt-6 border-t border-primary/10 transition-colors duration-300 hover:text-primary/80"
          >
            <ChevronLeft className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              View all writing
            </span>
          </Link>
        </aside>
      </div>
    </section>
  );
}


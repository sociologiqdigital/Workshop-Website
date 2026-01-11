import { Link } from "react-router-dom";
import { featuredBlog, secondaryBlogs } from "../data/blog";
import BlogImg from "../styles/images/BlogImg.jpg";

export default function Blog() {
  return (
    <section className="bg-background">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <p className="uppercase tracking-widest text-primary text-sm mb-3">
          From the journal
        </p>

        <h1 className="font-heading text-4xl md:text-5xl mb-6">
          Thoughts on clarity, systems & intentional growth
        </h1>

        <p className="text-muted max-w-2xl text-lg">
          Reflections, frameworks, and ideas to help you build with clarity —
          not chaos.
        </p>
      </div>

      {/* FEATURED BLOG */}
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to={featuredBlog.slug}
          className="group block relative overflow-hidden rounded-3xl mb-16"
        >
          {/* Background image */}
          <img
            src={BlogImg}
            alt={featuredBlog.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur">
                {featuredBlog.category}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur">
                5 min read
              </span>
            </div>

            <h2 className="text-white font-heading text-3xl md:text-4xl leading-tight mb-4">
              {featuredBlog.title}
            </h2>

            <p className="text-white/90 max-w-xl">{featuredBlog.excerpt}</p>

            <span className="inline-block mt-6 text-white font-medium underline underline-offset-4">
              Read article →
            </span>
          </div>
        </Link>
      </div>

      {/* OTHER ARTICLES */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {secondaryBlogs.map((post, index) => (
            <Link
              to={post.slug}
              key={index}
              className="group border-b pb-8 hover:border-primary transition"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 text-xs rounded-full border border-primary/30 text-primary">
                  {post.category}
                </span>
              </div>

              <h3 className="font-heading text-2xl mb-3 group-hover:text-primary transition">
                {post.title}
              </h3>

              <p className="text-muted mb-4">
                A short exploration into clarity, systems, and intentional
                growth.
              </p>

              <span className="text-primary font-medium">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

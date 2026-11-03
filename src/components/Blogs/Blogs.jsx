import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { blogCategories, posts } from '../../data/content.js';
import './Blogs.css';

const ALL = 'All';
const FILTERS = [ALL, ...blogCategories];

function PostCard({ post }) {
  return (
    <li>
      <article className="post card">
        <div className="post__media">
          <Picture
            name={post.image}
            className="post__img"
            alt={post.alt}
            sizes="(min-width: 900px) 30vw, (min-width: 600px) 46vw, 92vw"
          />
          <span className="post__category">{post.category}</span>
        </div>

        <div className="post__body">
          <h3 className="post__title">
            {/* The link's hit area stretches over the whole card. */}
            <SmartLink to={`/blogs/${post.slug}`} className="post__link">
              {post.title}
            </SmartLink>
          </h3>
          <p className="post__summary">{post.summary}</p>
          <span className="post__more" aria-hidden="true">
            {post.readTime ? `${post.readTime} min read` : 'Read article'}
            <ArrowRight size={16} strokeWidth={2.25} />
          </span>
        </div>
      </article>
    </li>
  );
}

export default function Blogs() {
  const [filter, setFilter] = useState(ALL);
  const visible = filter === ALL ? posts : posts.filter((post) => post.category === filter);

  return (
    <section className="section blogs container" id="blogs" aria-labelledby="blogs-title">
      <SectionHeader
        title="New every day"
        titleId="blogs-title"
        subtitle="Practical guides, honest advice and real experiences."
        action={{ label: 'See all blogs', to: '/blogs' }}
      >
        <div className="blogs__filters" role="group" aria-label="Filter articles by topic">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className="chip"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </SectionHeader>

      {visible.length > 0 ? (
        <ul className="blogs__grid">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      ) : (
        <p className="blogs__empty">No {filter.toLowerCase()} articles have been published yet.</p>
      )}

      <p className="sr-only" role="status">
        {visible.length === 1 ? '1 article shown' : `${visible.length} articles shown`}
      </p>
    </section>
  );
}

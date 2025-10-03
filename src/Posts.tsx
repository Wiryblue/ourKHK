import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from './main.tsx'
import type { Post } from "./types/post";

// Helper function using arrow syntax rather than func keyword syntax
// Converts ISO string passed to it into a localized string
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

// 'sorters' - comparison functions, compatible with Array.prototype.sort((a,b) => ...)
// the 'as const' part makes each comparator a literal type so we can write 'keyof typeof sorters' and get the exact union type
const sorters = {
  newest: (a: Post, b: Post) => +new Date(b.date) - +new Date(a.date),
  oldest: (a: Post, b: Post) => +new Date(a.date) - +new Date(b.date),
  title: (a: Post, b: Post) => a.title.localeCompare(b.title),
} as const;


// async func that queries Firestore and returns an array of posts
// await getDocs() - returns a Query saap shot || snapshot.docs - the QueryDocumentSnapshot objects 
// doc.data() returns document fields (untyped at run time), which are case to the Omit function as we'll put doc.id ourselves
// NOTE: If your Firestore has `date` as a Timestamp, convert it:
//   const raw = doc.data(); const date = raw.date?.toDate ? raw.date.toDate().toISOString() : raw.date;
//   return { id: doc.id, ...raw, date } as Post;
async function fetchPosts(): Promise<Post[]> {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Post, "id">) }));
}

// Single placeholder shown while data is loading. Can be enhanced with actual skeleton UI 
function SkeletonCard() {
  return <div>Loading...</div>;
}


// Func to specify formatting for displaying the individual posts' contents
// post is typed (Post), so accessing fields is type safe 
function PostCard({ post }: { post: Post }) {
  return (
    <article aria-labelledby={`post-${post.id}`}>
      {post.cover && <img src={post.cover} alt="" loading="lazy" />}
      <div>
        <h3 id={`post-${post.id}`}>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div>
          <span>
            {post.author ? `${post.author} • ` : ""}
            {formatDate(post.date)}
          </span>
        </div>
      </div>
      <a href={`#/posts/${post.id}`} aria-label={`Open post: ${post.title}`} />
    </article>
  );
}

// Paginations: renders prev/next + numbered page buttons
// Props (inputs to a component, similar to params for a func):
// page: current page (1-based)
// pageCount: total number of pages
// onPage: callback to set a new page (parent owns the state)
function Pagination (
    { page, pageCount, onPage }: { page: number; pageCount: number; onPage: (n: number) => void } // The onPage -> a prop that must have a func as its val. The func itself takes the arg 'n' of type number, and returns nothing
) {
  // If only one page
  if (pageCount <= 1) return null; 
  // Array.from builds arrays from 'array like' objects. In this case, an array is built with the length of pageCount
  // .map transforms each element, _ is a placeholder for the value of the array, i is the index, i+1 is the change done
  // Basically, you're changing each element of the array to increase by one to match real page number (instead of page 0-2, we have get page 1-3)
  const pages = Array.from({ length: pageCount }).map((_, i) => i + 1);
  return (
    // Nav HTML element. Aria-label is an accessibility thing that will let screen readers announce the section
    <nav aria-label="Pagination">
      {/* when clicked, calls parent's onPage func with page-1, but clamped to 1 using Math.max to prevent it going 
       below page 1. The disabled part simply removes this when you're on the first page */}
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}>
        Prev
      </button>
      {/* Loops over pages array
       For each page p, creates a button
       key = {p} -> React requires keys to efficiently re-render lists . Here, each page num is unique
       onClick -> tells parent to switch to page p 
       aria -> accessibility thing once more. Screen readers will announec this page as curr page if button is curr page
       {p} -> the number displayed on the button */}
      {pages.map((p) => (
        <button key={p} onClick={() => onPage(p)} aria-current={p === page ? "page" : undefined}>
          {p}
        </button>
      ))}
      {/* Renders a Next button. onClick func -> upon click, moves forward one page, but clamped to max pageCount
       disabled button - same thing as before, but for the reverse direction */}
      <button onClick={() => onPage(Math.min(pageCount, page + 1))} disabled={page === pageCount}>
        Next
      </button>
    </nav>
  );
}

// Function to define the toolbar where users can use various filtering mechanisms 
// Controlled inputs: value={...} + onChange={...} store the UI state in React 
// 'sort' is typed as 'keyof typeof sorters', so only the defined keys are allowed 
// Props 
function Toolbar({
  q, // curr search query string
  setQ, // func to update q
  sort, // curr sorting method
  setSort, // func to update sort
}: {
  q: string; 
  setQ: (s: string) => void;
  sort: keyof typeof sorters;
  setSort: (s: keyof typeof sorters) => void;
}) {
  return (
    <div className="px-30 pb-2">
      <label>
        <span className="pr-5">Search posts</span>
        {/*Controlled input: val comes from q, and onCHange updates q
        q -> the text shown in the input box is always whatever the q state is from the parent
             the input mirrors q. If q is "hello", the input shows "hello" 
        When something is typed, the browser gens a change event
        React passes this as e (event object)
        e.target is the DOM element (the input)
        e.target.value is the string currently inside the input
        onchange part -> calls setQ with new string from input
        setQ updates the parent's state 
        Since q comes back down as a prop, the input's value changes*/}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…" />
        {/* Show a clear (×) button only when q is non-empty */}
        {q && <button onClick={() => setQ("")} aria-label="Clear search">×</button>}
      </label>

      <label>
        <span>Sort</span>
        {/* Controlled select: value comes from sort, and onChange updates it */}
        <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorters)}>
          {/* Options must match keys of sorters */}
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title (A–Z)</option>
        </select>
      </label>
    </div>
  );
}

// If there is no posts or no posts that match the user's filter
function EmptyState() {
  return (
    <div>
      <h3>No posts found</h3>
      <p>Try adjusting your search or filters.</p>
    </div>
  );
}

// PostsPage: the main screen that ties everything together.
//
// State summary:
//  - loading/error: network lifecycle
//  - posts: raw data from Firestore
//  - q: search query (string)
//  - sort: which comparator to use (one of sorters’ keys)
//  - page: current page (1-based)
//  - pageSize: how many posts per page
export default function PostsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  // Parent-owned state
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof typeof sorters>("newest");
  const [page, setPage] = useState(1);
  const pageSize = 9;

    // Effect: fetch posts on mount.
  // The `mounted` flag prevents state updates after unmount (avoids React warning).
  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((data) => {
        if (!mounted) return;
        setPosts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message ?? "Failed to load posts");
        setLoading(false);
      });
    return () => {
      mounted = false; // cleanup: signal the promise resolution to ignore setState
    };
  }, []); // [] means run once on mount

    // Memoized derived data: apply search + sort to the raw posts.
  // useMemo caches the result until any dependency changes, avoiding needless recomputation.
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    // Filter by search query (title/excerpt). `filter` returns a **new** array,
    // so sorting that result won’t mutate the original `posts` state.
    let out = posts.filter((p) => {
      const matchesQ = keyword
        ? p.title.toLowerCase().includes(keyword) || p.excerpt.toLowerCase().includes(keyword)
        : true;
      return matchesQ;
    });
    // Sort in-place on the new array using the selected comparator.
    out.sort(sorters[sort]);
    return out;
  }, [posts, q, sort]); // recompute when any of these change

   // Pagination math: compute total pages, clamp current page if needed,
  // and slice the current window of posts to show.
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, pageCount);
  const pageItems = useMemo(() => {
    const start = (pageSafe - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSafe]);
  
  // Reset to page 1 whenever search or sort changes (otherwise you could end up on an empty page).
  useEffect(() => {
    setPage(1);
  }, [q, sort]);

    // Render tree: header → toolbar → list/skeleton/error/empty → pagination → footer
  return (
    <main>

      <section className="rounded-md bg-white p-8 shadow-sm px-30">
            <h2 className="mb-3 text-2xl font-bold">Who is Kappa Eta Kappa?</h2>
            <p className="mb-4">
                Delta chapter of Kappa Eta Kappa (<strong>KHK</strong>) was founded at the University of
                Wisconsin as an electrical engineering fraternity on February 9th, 1924. Many years have gone by
                and the chapter is still going strong. Today many of our members also study computer
                engineering, computer science and other technical programs.
            </p>
            <p>
                Our location has changed a few times over the many years. Today we're located right on campus at
                <strong>114 N. Orchard St.</strong> in Madison Wisconsin. This house has been great for us. It's
                a block away from CS, two blocks from Engineering Dr. and a block away from Camp Randall.
            </p>
            <p>
                Our Members have a high reputation for starting successful careers right out of school. Many of
                them immediately start work in industry. Others go on to graduate programs at the UW and
                elsewhere. Some recent talent has gone off to big companies such as <i>Google</i>,
                <i>Qualcomm</i>, and <i>Northrop Grumman</i>. Some have been fortunate to stay local at places
                like <i>Epic</i>, <i>X-ES Engineering</i>, and <i>Hardin Design and Development</i>.
            </p>
            <p>
                Here at KHK, we build life-long relationships. Through tradition and legacy, we're close enough
                to call ourselves a family. We support each other academically and personally. As part of our
                mission, we know that social growth is just as important as professional growth. We are always
                engaging with the community. Our house has an open door for Badger gamedays and other socials.
            </p>
        </section>

      <header className="px-30 py-5">
        <h1 className="font-bold">Posts</h1>
        <p>Browse our latest articles, tutorials, and updates.</p>
      </header>

      <Toolbar q={q} setQ={setQ} sort={sort} setSort={setSort} />

      <section className="px-30">
        {loading ? (
        // Loading state: show placeholders 
          <div>
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
            // Error state
          <div>{error}</div>
        ) : filtered.length === 0 ? (
            // Empty state
          <EmptyState />
        ) : (
            // Success state: render a page of posts + pagination controls
          <>
            <div>
              {pageItems.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
            <Pagination page={pageSafe} pageCount={pageCount} onPage={setPage} />
          </>
        )}
      </section>
    </main>
  );
}

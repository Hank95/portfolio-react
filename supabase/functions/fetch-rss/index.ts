import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  source: "substack";
  substackUrl: string;
  tags?: string[];
}

// Simple XML parser for RSS feeds
function parseRSSItem(item: string): BlogPost | null {
  const getTagContent = (tag: string, str: string): string => {
    const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const match = str.match(regex);
    return match ? (match[1] || match[2] || '').trim() : '';
  };

  const title = getTagContent('title', item);
  const link = getTagContent('link', item);
  const description = getTagContent('description', item);
  const content = getTagContent('content:encoded', item) || description;
  const pubDate = getTagContent('pubDate', item);
  const author = getTagContent('dc:creator', item) || getTagContent('author', item);

  if (!title || !link) return null;

  // Create slug from URL
  const urlParts = link.split('/');
  const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || title.toLowerCase().replace(/\s+/g, '-');

  return {
    slug: `substack-${slug}`,
    title,
    description: description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    content,
    publishedAt: pubDate ? new Date(pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    author: author || 'Henry Pendleton',
    source: 'substack',
    substackUrl: link,
  };
}

function parseRSS(xml: string): BlogPost[] {
  const items: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const post = parseRSSItem(match[1]);
    if (post) items.push(post);
  }

  return items;
}

// Cache for 1 hour
let cache: { posts: BlogPost[]; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return new Response(JSON.stringify({ posts: cache.posts }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Cache': 'HIT',
        },
      });
    }

    // Get Substack URL from environment variable
    const substackUrl = Deno.env.get('SUBSTACK_RSS_URL');

    if (!substackUrl) {
      return new Response(JSON.stringify({ posts: [], error: 'SUBSTACK_RSS_URL not configured' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Fetch RSS feed
    const response = await fetch(substackUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio RSS Reader)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`);
    }

    const xml = await response.text();
    const posts = parseRSS(xml);

    // Update cache
    cache = { posts, timestamp: Date.now() };

    return new Response(JSON.stringify({ posts }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('RSS fetch error:', error);
    return new Response(
      JSON.stringify({
        posts: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

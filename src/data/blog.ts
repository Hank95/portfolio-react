export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // HTML content
  publishedAt: string; // ISO date string
  author: string;
  source: "substack" | "local";
  substackUrl?: string;
  tags?: string[];
  featured?: boolean;
}

// Local posts - add your posts here
export const localPosts: BlogPost[] = [
  {
    slug: "cribscore-1-2-release",
    title: "CribScore 1.2: Leagues, Skunks, and One-Tap Scoring",
    description:
      "Introducing league standings with match points, head-to-head records, and a simpler tap-to-score interface in the latest CribScore update.",
    content: `
      <p>After a lot of cribbage games (and maybe a few too many lost to skunks), I'm excited to share what's new in CribScore 1.2. This update is all about tracking your progress over time and making the scoring experience even smoother.</p>

      <h2>The One Feature I Couldn't Stop Thinking About</h2>
      <p>Let me start with the smallest change that's made the biggest difference to how I use the app: <strong>tap-to-increment</strong>.</p>
      <p>Previously, you had to drag the score dial to select points. It works great for hands worth 12 or 24, but when you just need to add 1 point for "go" or a single pair? Dragging felt like overkill.</p>
      <p>Now you can just tap the dial to add +1. Tap, tap, tap, three points. It's faster, it feels more natural, and honestly I'm not sure why I didn't think of it sooner.</p>

      <h2>Finally: A Way to Track Who's Actually Winning</h2>
      <p>Here's the thing about cribbage, you might win a game, but <em>how</em> you win matters. If I beat you 121 to 118, sure, I won. But if I beat you 121 to 52? That's a <strong>double skunk</strong>, and in competitive cribbage, that's worth way more bragging rights.</p>
      <p>Version 1.2 introduces a proper <strong>league system</strong> with match points:</p>
      <ul>
        <li><strong>Regular win</strong>: 1 match point</li>
        <li><strong>Skunk</strong> (opponent &lt; 91 points): 2 match points</li>
        <li><strong>Double skunk</strong> (opponent &lt; 61 points): 3 match points</li>
      </ul>
      <p>The new <strong>League Table</strong> tracks everyone's standings, wins, losses, total match points, even how many times you've been skunked (sorry). It's accessible from the Game History screen, so you can finally settle those "who's really the better player" debates with data.</p>

      <h2>Head-to-Head Records</h2>
      <p>Speaking of debates, ever wondered what your actual record is against a specific opponent? The new <strong>Head-to-Head</strong> view lets you pick two players and see:</p>
      <ul>
        <li>Total games played between them</li>
        <li>Wins for each player</li>
        <li>Skunks dealt to each other</li>
        <li>Win percentages</li>
        <li>Recent game history</li>
      </ul>
      <p>My wife and I have been keeping mental track of this for years. Now the app does it for us. (She's ahead. I'm working on it.)</p>

      <h2>The Game Over Screen Got a Glow-Up</h2>
      <p>When you win a game now, the victory screen actually tells you something useful:</p>
      <ul>
        <li>Whether you scored a skunk or double skunk</li>
        <li>How many match points you earned</li>
        <li>A little celebration that matches the winner's color</li>
      </ul>
      <p>It's a small touch, but it makes winning (or losing) feel more meaningful.</p>

      <h2>Player Management</h2>
      <p>Over time, you might end up with duplicate players, maybe you typed "Bob" once and "bob" another time. Or someone changes their nickname. Version 1.2 lets you:</p>
      <ul>
        <li><strong>Rename</strong> players (all their game history follows them)</li>
        <li><strong>Merge</strong> duplicate players into one</li>
        <li><strong>Delete</strong> players you don't need anymore</li>
      </ul>
      <p>It's the kind of housekeeping feature that doesn't sound exciting until you need it.</p>

      <h2>Player Autocomplete</h2>
      <p>Starting a new game is faster now too. When you type a player name, the app suggests existing players as you type. No more retyping the same names or accidentally creating duplicates.</p>

      <h2>Under the Hood</h2>
      <p>For the nerdy details: I also added a proper test suite for the core game logic. Skunk detection, match point calculations, league standings, it's all covered by unit tests now. Sleep better knowing that a skunk at 90 points correctly awards 2 match points.</p>

      <hr />

      <h2>What's Next?</h2>
      <p>I'm already thinking about what comes next. Game timer visibility, perhaps. Or maybe iCloud sync so you can track games across devices. Let me know what features would make your cribbage nights better.</p>
      <p>For now, update to 1.2 and go earn some match points. Just try not to get skunked.</p>

      <hr />

      <p><em>CribScore is a free cribbage scorekeeping app for iOS. Download it on the App Store.</em></p>
    `,
    publishedAt: "2026-01-31",
    author: "Henry Pendleton",
    source: "local",
    tags: ["ios", "swiftui", "app-development", "cribbage"],
    featured: true,
  },
  {
    slug: "raspberry-pi-eink-dashboard",
    title: "From Dusty Raspberry Pi to Full-Stack Enlightenment",
    description:
      "How a simple e-ink calendar project turned into my own mini data center. Building an ESP32 weather station, FastAPI backend, and always-on e-ink display.",
    content: `
      <p><em>How a simple e-ink calendar project turned into my own mini data center</em></p>

      <h2>The Dream That Died (And Why I Came Back To It)</h2>
      <p>When I first got into web development, I had this romantic idea: host my own website on a Raspberry Pi.</p>
      <p>My code. My hardware. My tiny, humming box in the corner serving pages to the world.</p>
      <p>Then I discovered the rest of the sentence: SSL certs, port forwarding, DNS, security, DDoS, patching... and the not-so-small risk of turning my home network into target practice. I shelved the Pi and did what everyone does: deployed to The Cloud and moved on.</p>
      <p>Fast forward a few years. I'm working as a full-stack developer, shipping production code in React, Node, APIs, databases—real stuff used by real people. But there's a funny thing about professional development: you usually own a slice of the stack, not the whole thing. Code goes in, magic happens, users get a response.</p>
      <p>Then one cold, rainy day I found that same Raspberry Pi in a box in my closet.</p>
      <p>And this time, instead of hosting a public website, I decided to build something just for me.</p>

      <h2>What I Actually Built</h2>
      <p>This started as "just an e-ink calendar." It turned into a full little ecosystem running in my living room.</p>
      <p>Here's the current setup:</p>
      <pre><code>┌───────────────┐   WiFi   ┌───────────────┐   SPI   ┌────────────────┐
│    ESP32      │  ─────►  │ Raspberry Pi  │  ───►  │  E-Ink Display │
│  + temp/humid │          │ + FastAPI     │        │  (7.5")        │
└───────────────┘          │ + SQLite      │        └────────────────┘
                           │ + Web UI      │
                           └───────────────┘
                                  │
                                  ▼
                           Any device on my
                              home Wi-Fi</code></pre>
      <p>What it does right now:</p>
      <ul>
        <li>Reads temperature and humidity from an ESP32 sensor node</li>
        <li>Streams that data over Wi-Fi to the Raspberry Pi</li>
        <li>Stores everything in a local SQLite database</li>
        <li>Serves a web dashboard I can open from my laptop or phone</li>
        <li>Renders a clean, always-on layout to a 7.5" e-ink display on my desk</li>
      </ul>
      <p>Total cost: under $100. Total control: every. single. layer.</p>

      <h2>The ESP32: My Tiny Weather Station</h2>
      <p>On the hardware side, I built a small indoor "weather station":</p>
      <ul>
        <li>ESP32 dev board</li>
        <li>DHT11 temperature/humidity sensor</li>
        <li>Tiny OLED screen for local readouts</li>
      </ul>
      <p>Every minute, the ESP32:</p>
      <ol>
        <li>Reads the sensor</li>
        <li>Shows the reading on the OLED</li>
        <li>Sends a JSON payload to the Pi over Wi-Fi</li>
      </ol>
      <p>Watching that POST request land in my own logs on my own hardware is surprisingly satisfying.</p>

      <h2>The Raspberry Pi: My Personal Server Rack</h2>
      <p>The Raspberry Pi is the "data center":</p>
      <ul>
        <li>A FastAPI server to accept sensor data</li>
        <li>A SQLite file acting as the database</li>
        <li>A web dashboard accessible from any device on my network</li>
        <li>A driver system that renders layouts onto the e-ink display</li>
      </ul>
      <p>No Docker swarm, no load balancers, no managed anything. Just a $50 single-board computer quietly running a full stack.</p>

      <h2>The Dashboard: A Window Into My Living Room Climate</h2>
      <p>The dashboard is intentionally simple:</p>
      <ul>
        <li>Plain HTML + CSS + vanilla JS</li>
        <li>Live-updating temperature/humidity cards</li>
        <li>A 24-hour temperature graph powered by a lightweight chart library</li>
        <li>Auto-refresh every 30 seconds</li>
      </ul>
      <p>It's something I actually use every day.</p>

      <h2>The E-Ink Display: Always-On, Zero-Noise</h2>
      <p>The Waveshare 7.5" e-ink panel gives the whole project a polished, always-on look.</p>
      <p>I built a small widget/layout system so I can define sections like:</p>
      <ul>
        <li>Indoor climate</li>
        <li>Weather</li>
        <li>Clock</li>
        <li>Stats / history sparkline</li>
      </ul>
      <p>The Pi renders the whole layout to an image using Pillow and refreshes the display every few minutes.</p>
      <p>The effect is a clean, quiet "status board" that just exists on my desk.</p>

      <h2>The Moment Everything Clicked</h2>
      <p>One evening I glanced at the dashboard on my phone and saw a sharp spike in humidity.</p>
      <p>I had just stepped out of the shower.</p>
      <p>And for the first time, I could trace that spike across the entire stack:</p>
      <ul>
        <li>The DHT11 read a higher humidity value</li>
        <li>The ESP32 turned it into JSON</li>
        <li>An HTTP POST hit my FastAPI endpoint</li>
        <li>SQLite wrote a new row</li>
        <li>My dashboard fetched updated data</li>
        <li>JavaScript re-rendered the chart</li>
      </ul>
      <p>It connected the physical world, the software world, and the display world—end-to-end—on a system I actually built.</p>

      <h2>The Education I Didn't Know I Needed</h2>
      <p>Three years of professional development taught me how to ship software. This project reminded me what's happening underneath all the abstractions we use every day.</p>
      <p><strong>HTTP isn't magic.</strong> It's plain text over a socket. Watching raw requests arrive in my logs demystifies the whole thing.</p>
      <p><strong>A database can be one file.</strong> SQLite is a single <code>.db</code> file that I can copy, inspect, email, or query.</p>
      <p><strong>Frontend and backend share the same DNA.</strong> They're just runtimes exchanging text.</p>
      <p><strong>The full stack goes deeper and higher than diagrams.</strong> Down to GPIO pins, up to UI polish.</p>
      <p>Owning the whole pipeline—even in a small project—makes you a better developer anywhere in it.</p>

      <h2>What's Next</h2>
      <ul>
        <li>More ESP32 sensor nodes in other rooms</li>
        <li>Push alerts when temperature/humidity leaves a safe range</li>
        <li>Long-term trend analysis</li>
        <li>Additional e-ink displays around the house</li>
      </ul>
      <p>But honestly, the biggest win is the clarity this project gave me. The cloud is abstract; this setup is tangible.</p>

      <h2>If You've Got a Dusty Pi Lying Around...</h2>
      <p>Here's my pitch:</p>
      <p><strong>Don't expose it to the internet. Start by exposing it to yourself.</strong></p>
      <p>Your home network is a perfect sandbox. Build something useful, something visual, something you can touch.</p>
      <p>The dusty Pi in your closet is more than a toy—it's a zero-cost, zero-risk lab for leveling up as a developer.</p>
      <p>Go blow the dust off. See what happens.</p>

      <p><em>The total cost of this project was under $100. The education was priceless.</em></p>

      <h2>TL;DR: How to Build This Yourself</h2>
      <p>A high-level summary of the build:</p>
      <h3>Hardware</h3>
      <ul>
        <li>Raspberry Pi</li>
        <li>ESP32</li>
        <li>DHT11 or DHT22 sensor</li>
        <li>Optional OLED</li>
        <li>Waveshare 7.5" e-ink display</li>
      </ul>
      <h3>Software (Pi)</h3>
      <ul>
        <li>FastAPI server</li>
        <li>SQLite</li>
        <li>Vanilla JS dashboard</li>
        <li>E-ink layout renderer</li>
        <li>systemd auto-start</li>
      </ul>
      <h3>Software (ESP32)</h3>
      <ul>
        <li>Read sensor</li>
        <li>Show locally</li>
        <li>Send JSON to Pi every 60s</li>
      </ul>
      <h3>What You Get</h3>
      <ul>
        <li>Local-only server</li>
        <li>Live dashboard</li>
        <li>Always-on e-ink display</li>
        <li>A visceral understanding of how the web actually works</li>
      </ul>

      <h2>Tech Notes & Source Code</h2>
      <p>Full repository with setup instructions, wiring diagrams, and code:</p>
      <p><a href="https://github.com/Hank95/eink-hub" target="_blank" rel="noopener noreferrer">GitHub: eink-hub</a></p>
    `,
    publishedAt: "2026-01-25",
    author: "Henry Pendleton",
    source: "local",
    tags: ["raspberry-pi", "esp32", "python", "fastapi", "hardware"],
    featured: true,
  },
  {
    slug: "hello-world",
    title: "Hello World",
    description:
      "Welcome to my blog. A space for thoughts on software engineering, MarTech, and the occasional ultrarunning tangent.",
    content: `
      <p>Welcome to my blog.</p>
      <p>This is where I'll share thoughts on software engineering, MarTech, and occasionally some ultrarunning tangents. The plan is to write about things I'm learning, building, or thinking about—not hot takes or thought leadership, just honest reflections on the work.</p>
      <h2>What to expect</h2>
      <p>I'm interested in the intersection of engineering and marketing technology. The tools we build to understand customer behavior, automate workflows, and measure what matters. There's a lot of interesting problems in this space that don't get much attention.</p>
      <p>I'll also write about side projects, technical decisions I'm wrestling with, and maybe some race reports if anyone's curious what it's like to run 100 kilometers through the desert.</p>
      <h2>Why a blog on my portfolio?</h2>
      <p>Mostly because I wanted to build it. There's something satisfying about having a space that's truly yours—no algorithm, no engagement metrics, just words on a page.</p>
      <p>More soon.</p>
    `,
    publishedAt: "2025-01-24",
    author: "Henry Pendleton",
    source: "local",
    tags: ["meta"],
    featured: false,
  },
];

// Helper functions
export const getAllPosts = (posts: BlogPost[] = localPosts): BlogPost[] => {
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};

export const getFeaturedPosts = (
  posts: BlogPost[] = localPosts,
): BlogPost[] => {
  return getAllPosts(posts).filter((p) => p.featured);
};

export const getPostBySlug = (
  slug: string,
  posts: BlogPost[] = localPosts,
): BlogPost | undefined => {
  return posts.find((p) => p.slug === slug);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

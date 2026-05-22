export type BlogCategory =
  | "AI/ML"
  | "Frontend"
  | "System Design"
  | "Cybersecurity"
  | "Full Stack";

export interface BlogSection {
  type: "heading" | "paragraph" | "code" | "callout" | "image" | "list";
  level?: 2 | 3;
  content?: string;
  language?: string;
  items?: string[];
  variant?: "info" | "warning" | "tip" | "highlight";
  src?: string;
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  date: string;
  excerpt: string;
  content: BlogSection[];
  featured: boolean;
  gradient: string;
  icon: string;
}

export const blogs: BlogPost[] = [
  {
    slug: "building-ai-resume-analyzer",
    title: "Building an AI Resume Analyzer with LLMs & ATS Parsing",
    subtitle: "How I built a production-grade resume analysis system using LangChain, FAISS, and GPT-4 that achieves 98% ATS precision",
    category: "AI/ML",
    tags: ["LangChain", "LLM", "FAISS", "FastAPI", "NLP", "ATS"],
    readingTime: 8,
    date: "2025-04-12",
    excerpt: "A deep-dive into architecting an intelligent resume analyzer that uses vector embeddings, semantic search, and LLM reasoning to parse, score, and improve resumes against ATS systems.",
    featured: true,
    gradient: "from-blue-600 via-violet-600 to-purple-700",
    icon: "🤖",
    content: [
      {
        type: "paragraph",
        content: "Resume screening is a solved problem — until you realize most ATS systems are fundamentally broken. After watching dozens of qualified engineers get filtered out by keyword-matching bots, I decided to build something better: an AI-powered resume analyzer that thinks like a senior recruiter.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Core Architecture",
      },
      {
        type: "paragraph",
        content: "The system is built on a three-layer pipeline: semantic parsing, contextual analysis, and intelligent feedback generation. Each layer builds on the previous, creating a holistic understanding of any resume.",
      },
      {
        type: "code",
        language: "python",
        content: `# Core RAG Pipeline for Resume Analysis
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA

class ResumeAnalyzer:
    def __init__(self, job_description: str):
        self.embeddings = OpenAIEmbeddings()
        self.jd_vectorstore = self._embed_jd(job_description)
    
    def _embed_jd(self, jd: str) -> FAISS:
        chunks = self._chunk_text(jd, chunk_size=512)
        return FAISS.from_texts(chunks, self.embeddings)
    
    def analyze(self, resume_text: str) -> dict:
        resume_chunks = self._chunk_text(resume_text)
        scores = []
        
        for chunk in resume_chunks:
            similar = self.jd_vectorstore.similarity_search(
                chunk, k=3
            )
            score = self._compute_relevance(chunk, similar)
            scores.append(score)
        
        return {
            "ats_score": sum(scores) / len(scores),
            "gaps": self._identify_gaps(resume_text),
            "suggestions": self._generate_improvements()
        }`,
      },
      {
        type: "heading",
        level: 2,
        content: "Semantic Chunking Strategy",
      },
      {
        type: "paragraph",
        content: "Traditional chunking splits text by character count, losing semantic coherence. I implemented a sentence-boundary-aware chunker with overlap that preserves context across chunks — critical for understanding multi-sentence skill descriptions.",
      },
      {
        type: "callout",
        variant: "tip",
        content: "Key insight: Overlapping chunks by 20% dramatically improves retrieval accuracy for technical skill matching, as skills are often described across sentence boundaries.",
      },
      {
        type: "heading",
        level: 2,
        content: "ATS Scoring Algorithm",
      },
      {
        type: "paragraph",
        content: "The scoring model combines cosine similarity scores from FAISS retrieval with an LLM-based contextual judgment. Pure embedding similarity misses synonyms and contextual equivalents — 'ML Engineer' and 'Machine Learning Scientist' are semantically similar but cosine-distant in embedding space.",
      },
      {
        type: "list",
        items: [
          "Semantic similarity via FAISS vector search (weight: 60%)",
          "Keyword frequency analysis with TF-IDF (weight: 20%)",
          "LLM contextual relevance scoring (weight: 20%)",
          "Penalty for buzzword stuffing detection",
          "Bonus for quantified achievements (numbers, percentages)",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "FastAPI Backend & Deployment",
      },
      {
        type: "code",
        language: "python",
        content: `# FastAPI endpoint with async processing
from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile,
    job_description: str
):
    # Extract text from PDF/DOCX
    text = await extract_text(resume)
    
    # Initialize analyzer with JD context
    analyzer = ResumeAnalyzer(job_description)
    
    # Stream results as they compute
    async def stream_analysis():
        result = analyzer.analyze(text)
        yield json.dumps({"status": "parsing", "progress": 25})
        yield json.dumps({"status": "scoring", "progress": 75})
        yield json.dumps({"result": result, "progress": 100})
    
    return StreamingResponse(stream_analysis())`,
      },
      {
        type: "callout",
        variant: "highlight",
        content: "Result: The system achieves 98% ATS keyword precision and generates actionable improvement suggestions that helped test users increase interview callback rates by ~40%.",
      },
    ],
  },
  {
    slug: "rag-pipeline-architecture",
    title: "RAG Pipeline Architecture: From Chunks to Contextual Intelligence",
    subtitle: "A deep technical walkthrough of building production-grade Retrieval-Augmented Generation systems with FAISS, hybrid search, and re-ranking",
    category: "AI/ML",
    tags: ["RAG", "FAISS", "Vector DB", "LangChain", "Python", "Architecture"],
    readingTime: 10,
    date: "2025-03-28",
    excerpt: "Everything I learned building real RAG systems — chunking strategies, embedding models, hybrid retrieval, re-ranking pipelines, and how to avoid the common pitfalls that destroy retrieval quality.",
    featured: true,
    gradient: "from-violet-600 via-purple-600 to-pink-600",
    icon: "🧠",
    content: [
      {
        type: "paragraph",
        content: "RAG sounds simple: embed your documents, store vectors, retrieve relevant chunks, pass to LLM. But production RAG systems are where this simplicity shatters. After building multiple RAG pipelines, I've catalogued every failure mode and the architectural patterns that prevent them.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Chunking Problem",
      },
      {
        type: "paragraph",
        content: "Your retrieval quality ceiling is set by your chunking strategy. Fixed-size chunking is the worst option for most use cases — it blindly splits on character count, creating semantically incoherent fragments that confuse the retrieval model.",
      },
      {
        type: "code",
        language: "python",
        content: `# Hierarchical chunking with semantic boundaries
from langchain.text_splitter import RecursiveCharacterTextSplitter
import spacy

nlp = spacy.load("en_core_web_sm")

class SemanticChunker:
    def __init__(self, chunk_size=512, overlap=64):
        self.chunk_size = chunk_size
        self.overlap = overlap
    
    def chunk(self, text: str) -> list[str]:
        # Parse into sentences with spaCy
        doc = nlp(text)
        sentences = [sent.text for sent in doc.sents]
        
        chunks = []
        current_chunk = []
        current_size = 0
        
        for sentence in sentences:
            sent_size = len(sentence.split())
            
            if current_size + sent_size > self.chunk_size:
                chunks.append(" ".join(current_chunk))
                # Keep overlap sentences
                current_chunk = current_chunk[-2:]
                current_size = sum(len(s.split()) 
                                   for s in current_chunk)
            
            current_chunk.append(sentence)
            current_size += sent_size
        
        if current_chunk:
            chunks.append(" ".join(current_chunk))
        
        return chunks`,
      },
      {
        type: "heading",
        level: 2,
        content: "Hybrid Search: Dense + Sparse Retrieval",
      },
      {
        type: "paragraph",
        content: "Pure dense retrieval (embedding similarity) misses exact keyword matches. Pure sparse retrieval (BM25) misses semantic equivalents. The solution is hybrid retrieval — combining both with a reciprocal rank fusion algorithm.",
      },
      {
        type: "list",
        items: [
          "Dense retrieval: FAISS with text-embedding-ada-002 for semantic search",
          "Sparse retrieval: BM25 for exact keyword and phrase matching",
          "Reciprocal Rank Fusion (RRF) to merge ranked results",
          "Cross-encoder re-ranking for final relevance ordering",
          "MMR (Maximal Marginal Relevance) for diversity in results",
        ],
      },
      {
        type: "callout",
        variant: "info",
        content: "Hybrid search consistently outperforms either approach alone by 15-25% on standard RAG benchmarks. The cost is minimal — BM25 is computationally cheap and adds negligible latency.",
      },
      {
        type: "heading",
        level: 2,
        content: "Re-Ranking with Cross-Encoders",
      },
      {
        type: "code",
        language: "python",
        content: `# Cross-encoder re-ranking pipeline
from sentence_transformers import CrossEncoder

class RAGPipeline:
    def __init__(self):
        self.cross_encoder = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )
    
    def retrieve_and_rerank(
        self, 
        query: str, 
        k_retrieve: int = 20,
        k_final: int = 5
    ) -> list[str]:
        # Step 1: Broad retrieval (dense + sparse)
        candidates = self.hybrid_search(query, k=k_retrieve)
        
        # Step 2: Cross-encoder re-ranking
        pairs = [(query, doc.page_content) 
                 for doc in candidates]
        scores = self.cross_encoder.predict(pairs)
        
        # Step 3: Sort by cross-encoder score
        ranked = sorted(
            zip(candidates, scores),
            key=lambda x: x[1],
            reverse=True
        )
        
        return [doc for doc, _ in ranked[:k_final]]`,
      },
    ],
  },
  {
    slug: "phishing-detection-ml-system",
    title: "Building a Phishing Website Detection System with Machine Learning",
    subtitle: "How I engineered a real-time URL threat analysis system using feature extraction, gradient boosting, and neural classifiers achieving 97.6% accuracy",
    category: "Cybersecurity",
    tags: ["Machine Learning", "Cybersecurity", "Python", "XGBoost", "Flask", "Security"],
    readingTime: 7,
    date: "2025-02-14",
    excerpt: "A technical breakdown of my phishing detection system — from URL feature engineering and dataset construction to model training, evaluation, and real-time API deployment.",
    featured: true,
    gradient: "from-red-600 via-orange-600 to-yellow-600",
    icon: "🔒",
    content: [
      {
        type: "paragraph",
        content: "Phishing attacks cost organizations $3.8 billion annually. Most detection systems rely on blocklists — reactive, always behind the attackers. I built a proactive ML system that analyzes URL structure, content patterns, and behavioral signals to detect phishing in real time, even for brand-new domains.",
      },
      {
        type: "heading",
        level: 2,
        content: "Feature Engineering: What Makes a URL Suspicious",
      },
      {
        type: "list",
        items: [
          "URL length and complexity (phishing URLs are 2x longer on average)",
          "Presence of IP address in URL instead of domain name",
          "Number of subdomains (legit sites rarely exceed 2)",
          "Use of URL shortening services (bit.ly, tinyurl, etc.)",
          "HTTPS presence but mismatched SSL certificate",
          "Domain age via WHOIS (< 6 months = high risk)",
          "Levenshtein distance from known brand domains",
          "Entropy of URL path (random strings = suspicious)",
        ],
      },
      {
        type: "code",
        language: "python",
        content: `# Feature extraction pipeline
import re
import whois
import tldextract
from urllib.parse import urlparse
import math

class URLFeatureExtractor:
    def extract(self, url: str) -> dict:
        parsed = urlparse(url)
        ext = tldextract.extract(url)
        
        return {
            # Structural features
            "url_length": len(url),
            "num_dots": url.count("."),
            "num_hyphens": url.count("-"),
            "num_subdomains": len(ext.subdomain.split(".")),
            "has_ip": self._has_ip_address(url),
            "path_depth": len(parsed.path.split("/")) - 1,
            
            # Entropy features
            "url_entropy": self._shannon_entropy(url),
            "path_entropy": self._shannon_entropy(parsed.path),
            
            # Domain features  
            "domain_age_days": self._get_domain_age(ext.domain),
            "has_https": int(parsed.scheme == "https"),
            "tld_risk_score": self._tld_risk(ext.suffix),
            
            # Brand similarity
            "brand_distance": self._min_brand_distance(
                ext.domain
            ),
        }
    
    def _shannon_entropy(self, text: str) -> float:
        freq = {c: text.count(c) for c in set(text)}
        return -sum(
            (f/len(text)) * math.log2(f/len(text))
            for f in freq.values()
        )`,
      },
      {
        type: "heading",
        level: 2,
        content: "Model Architecture: Ensemble Approach",
      },
      {
        type: "paragraph",
        content: "Single models plateau around 94% accuracy on this problem. The ensemble stacks XGBoost (strong on structured features), a Random Forest (robust to noisy features), and a small neural network (captures non-linear feature interactions) with a logistic meta-learner.",
      },
      {
        type: "callout",
        variant: "highlight",
        content: "Final accuracy: 97.6% on holdout set, with 96.2% recall on phishing class (critical — false negatives are dangerous). False positive rate: 1.8%.",
      },
    ],
  },
  {
    slug: "advanced-react-animation-techniques",
    title: "Advanced React Animation Techniques: Framer Motion & Canvas 2D",
    subtitle: "A practical guide to building cinematic, 60fps animations in React — from Framer Motion spring physics to custom particle systems on HTML5 Canvas",
    category: "Frontend",
    tags: ["React", "Framer Motion", "Canvas 2D", "Animation", "Performance", "Next.js"],
    readingTime: 9,
    date: "2025-01-20",
    excerpt: "Everything I know about building silky-smooth animations in React — spring physics, layout animations, shared element transitions, custom easing curves, and GPU-accelerated Canvas particle systems.",
    featured: true,
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    icon: "✨",
    content: [
      {
        type: "paragraph",
        content: "Most React animations are either too simple (opacity fade-ins) or too heavy (Three.js for everything). The sweet spot is a layered strategy: Framer Motion for UI transitions, CSS for micro-interactions, and Canvas 2D for particle/generative effects.",
      },
      {
        type: "heading",
        level: 2,
        content: "Spring Physics: The Foundation of Natural Motion",
      },
      {
        type: "paragraph",
        content: "Easing curves are approximations. Spring physics are simulations. Springs feel alive because they model how physical objects actually move — with mass, stiffness, and damping. Framer Motion's spring system is remarkably expressive.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Spring physics for magnetic button effect
import { motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-50, 50], [10, -10]);
  const rotateY = useTransform(mouseX, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Canvas 2D Particle Systems",
      },
      {
        type: "paragraph",
        content: "For ambient background effects, Canvas 2D beats CSS animations and Three.js for this scale. A 300-particle sphere rendered via 2D projection runs at 60fps on any modern device with zero GPU overhead, while Three.js would add 380KB to the bundle.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Fibonacci sphere particle system
function HolographicOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    
    // Fibonacci distribution for uniform sphere coverage
    const particles = Array.from({ length: 300 }, (_, i) => {
      const phi = Math.acos(1 - (2 * i) / 300);
      const theta = Math.sqrt(300 * Math.PI) * phi;
      const r = 200;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });
    
    let angleY = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angleY += 0.003;
      
      particles
        .map(p => {
          // Y-axis rotation matrix
          const x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
          const z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
          
          // Perspective projection
          const fov = 400;
          const scale = fov / (fov + z);
          
          return { 
            sx: x * scale + canvas.width / 2,
            sy: p.y * scale + canvas.height / 2,
            z, scale 
          };
        })
        .sort((a, b) => a.z - b.z) // Painter's algorithm
        .forEach(({ sx, sy, scale }) => {
          ctx.beginPath();
          ctx.arc(sx, sy, scale * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = \`rgba(96, 165, 250, \${scale * 0.7})\`;
          ctx.fill();
        });
      
      requestAnimationFrame(animate);
    };
    
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);
  
  return <canvas ref={canvasRef} />;
}`,
      },
      {
        type: "callout",
        variant: "tip",
        content: "Performance rule: Keep Canvas particle counts under 500 for mobile. Use requestAnimationFrame cancellation in cleanup to avoid memory leaks. Always use alpha: false context for opaque canvases — it's significantly faster.",
      },
    ],
  },
  {
    slug: "secure-socket-communication-system",
    title: "Engineering Secure Real-Time Communication with WebSockets & AES-256",
    subtitle: "How I built an end-to-end encrypted chat system using WebSockets, AES-256-GCM, ECDH key exchange, and FastAPI with zero plaintext transmission",
    category: "Cybersecurity",
    tags: ["WebSockets", "AES-256", "Encryption", "FastAPI", "Python", "Security"],
    readingTime: 8,
    date: "2024-12-10",
    excerpt: "A technical breakdown of implementing true end-to-end encryption for real-time communication — covering ECDH key exchange, AES-256-GCM encryption, message integrity, and replay attack prevention.",
    featured: false,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    icon: "🔐",
    content: [
      {
        type: "paragraph",
        content: "Most WebSocket implementations transmit messages in plaintext, relying entirely on TLS for security. But TLS only encrypts in transit — if your server is compromised, all messages are exposed. True end-to-end encryption means the server never sees decrypted message content.",
      },
      {
        type: "heading",
        level: 2,
        content: "ECDH Key Exchange",
      },
      {
        type: "paragraph",
        content: "Each client generates an ephemeral ECDH keypair on connection. The public keys are exchanged through the server (which can't derive the shared secret from them). Both parties independently compute the same shared secret using their private key and the other's public key.",
      },
      {
        type: "code",
        language: "python",
        content: `# Server-side WebSocket handler with E2E encryption
from cryptography.hazmat.primitives.asymmetric.x25519 import (
    X25519PrivateKey
)
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes, serialization

class SecureChannel:
    def __init__(self):
        # Generate ephemeral keypair per session
        self.private_key = X25519PrivateKey.generate()
        self.public_key = self.private_key.public_key()
    
    def get_public_bytes(self) -> bytes:
        return self.public_key.public_bytes(
            serialization.Encoding.Raw,
            serialization.PublicFormat.Raw
        )
    
    def derive_shared_key(self, peer_public_bytes: bytes) -> bytes:
        from cryptography.hazmat.primitives.asymmetric.x25519 import (
            X25519PublicKey
        )
        peer_key = X25519PublicKey.from_public_bytes(peer_public_bytes)
        shared_secret = self.private_key.exchange(peer_key)
        
        # Derive AES key using HKDF
        return HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b"socket-channel-v1"
        ).derive(shared_secret)`,
      },
      {
        type: "callout",
        variant: "warning",
        content: "Never reuse nonces with AES-GCM. Each message must use a fresh random 96-bit nonce. Nonce reuse completely breaks AES-GCM security and exposes both the key and all messages.",
      },
    ],
  },
  {
    slug: "ai-portfolio-assistant-architecture",
    title: "Architecting an AI Portfolio Assistant: From Context to Conversation",
    subtitle: "The technical design behind a context-aware AI assistant that understands your entire portfolio, answers recruiter questions, and maintains conversation state",
    category: "Full Stack",
    tags: ["Gemini AI", "Next.js", "API Routes", "Context Engineering", "React", "AI"],
    readingTime: 6,
    date: "2025-05-01",
    excerpt: "How I designed and built the AI assistant embedded in this portfolio — covering context injection, conversation management, API architecture, and the prompt engineering that makes it actually useful.",
    featured: false,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: "💡",
    content: [
      {
        type: "paragraph",
        content: "Most portfolio chatbots are glorified contact forms. They answer 'what are your skills?' with a canned list. I wanted something different — an assistant that understands my entire portfolio context and can have a real conversation with a recruiter about my work, architecture decisions, and engineering philosophy.",
      },
      {
        type: "heading",
        level: 2,
        content: "Context Engineering: Giving the AI Everything It Needs",
      },
      {
        type: "paragraph",
        content: "The key insight is that LLMs are only as good as their context. I built a structured resume context object that's injected into every conversation — projects with tech stacks, experience descriptions, skills with proficiency levels, and even my contact info.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Context injection architecture
const SYSTEM_PROMPT = \`You are an AI assistant for Yashwanth Sri Sai's 
portfolio. You have access to his complete professional profile.

PROFILE CONTEXT:
\${JSON.stringify(RESUME_DATA, null, 2)}

BEHAVIOR RULES:
- Answer only about Yashwanth's professional background
- Be concise but technically precise  
- Highlight concrete achievements and metrics
- For technical questions, demonstrate deep understanding
- Always maintain professional, confident tone
- If asked about contact, provide: k.yashwanthsrisai09@gmail.com\`;

// API Route Handler (Next.js App Router)
export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await genAI.generateContent({
    systemInstruction: SYSTEM_PROMPT,
    contents: messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }))
  });
  
  return Response.json({ 
    reply: response.response.text() 
  });
}`,
      },
      {
        type: "heading",
        level: 2,
        content: "Conversation State Management",
      },
      {
        type: "paragraph",
        content: "Unlike stateless chatbots, this assistant maintains full conversation history. Each API call sends the complete message history, allowing the model to reference earlier context — so a recruiter can ask 'tell me more about that project' and it knows which project they mean.",
      },
      {
        type: "list",
        items: [
          "Full conversation history sent with every request",
          "Message deduplication to prevent context bloat",
          "Suggested questions auto-generated from portfolio context",
          "Error state handling with graceful fallback messages",
          "Optimistic UI updates with message streaming",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        content: "Context window management is critical. For long conversations, implement a sliding window that keeps the last N messages plus the system context. Gemini 1.5's 1M token context window makes this much easier than GPT-4.",
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getFeaturedBlogs(): BlogPost[] {
  return blogs.filter((b) => b.featured);
}

export function getBlogsByCategory(category: BlogCategory): BlogPost[] {
  return blogs.filter((b) => b.category === category);
}

export const ALL_CATEGORIES: BlogCategory[] = [
  "AI/ML",
  "Frontend",
  "System Design",
  "Cybersecurity",
  "Full Stack",
];

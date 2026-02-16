"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowRight,
  Copy,
  Check,
  X,
  Menu,
  HeartHandshake,
  Users,
  Building2,
  Stethoscope,
  Baby,
  Target,
  Eye,
  Lightbulb,
} from "lucide-react";
import { Footer } from "@/components/footer";

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  
  return count;
}

// Copy to clipboard component
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{text}</p>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}

// Image Lightbox Component
function ImageLightbox({ isOpen, onClose, imageSrc, alt }: { isOpen: boolean; onClose: () => void; imageSrc: string; alt: string }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={imageSrc}
          alt={alt}
          width={1200}
          height={800}
          className="object-contain max-h-[90vh]"
        />
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat, isVisible }: { stat: { label: string; value: number; suffix?: string; prefix?: string }; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  return (
    <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur">
      <div className="text-4xl md:text-5xl font-bold text-[#F5A623] mb-2">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <p className="text-gray-200">{stat.label}</p>
    </div>
  );
}

const GRID_LOGIN_URL = "https://care.kerala.gov.in/login";

export default function KARELandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; alt: string }>({ isOpen: false, src: "", alt: "" });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Dynamically calculate header height
      const header = document.querySelector('header');
      const headerOffset = header ? header.offsetHeight - 20 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  // Stats data
  const stats = [
    { label: "Children Supported", value: 150, suffix: "+" },
    { label: "Crores Target", value: 100, prefix: "₹" },
    { label: "Diseases Covered", value: 5, suffix: "+" },
    { label: "Years of Care", value: 4, suffix: "+" },
  ];

  // Diseases covered
  const diseases = [
    {
      name: "Spinal Muscular Atrophy (SMA)",
      description: "A genetic disorder affecting motor neurons, leading to muscle weakness. Kerala became the first state to provide state-funded SMA treatment.",
      icon: Baby,
    },
    {
      name: "Gaucher Disease",
      description: "A genetic disorder where fatty substances accumulate in organs and tissues, affecting the spleen, liver, and bone marrow.",
      icon: Heart,
    },
    {
      name: "Pompe Disease",
      description: "A rare inherited disorder caused by deficiency of an enzyme that breaks down glycogen, affecting muscles throughout the body.",
      icon: Stethoscope,
    },
    {
      name: "MPS (Mucopolysaccharidoses)",
      description: "A group of metabolic disorders caused by absence or malfunction of enzymes needed to break down molecules called glycosaminoglycans.",
      icon: HeartHandshake,
    },
  ];

  // Gallery images
  const galleryImages = [
    { src: "/images/image2.png", alt: "KARE Program Photo 1" },
    { src: "/images/image3.png", alt: "KARE Program Photo 2" },
    { src: "/images/image4.png", alt: "KARE Program Photo 3" },
    { src: "/images/image5.png", alt: "KARE Program Photo 4" },
    { src: "/images/image6.png", alt: "KARE Program Photo 5" },
    { src: "/images/image7.png", alt: "KARE Program Photo 6" },
    { src: "/images/image8.png", alt: "KARE Program Photo 7" },
    { src: "/images/image9.png", alt: "KARE Program Photo 8" },
    { src: "/images/image10.png", alt: "KARE Program Photo 9" },
    { src: "/images/image11.png", alt: "KARE Program Photo 10" },
    { src: "/images/image12.png", alt: "KARE Program Photo 11" },
    { src: "/images/image13.png", alt: "KARE Program Photo 12" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/kare-logo.jpg" 
                alt="KARE Logo" 
                width={48} 
                height={48} 
                className="rounded-full"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-[#006B6B]">
                  KARE
                </span>
                <p className="text-xs text-gray-500 -mt-0.5">
                  Kerala United Against Rare Diseases
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-gray-600 hover:text-[#006B6B] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("impact")}
                className="text-sm text-gray-600 hover:text-[#006B6B] transition-colors"
              >
                Impact
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-sm text-gray-600 hover:text-[#006B6B] transition-colors"
              >
                Gallery
              </button>
              <a
                href={GRID_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#006B6B] transition-colors"
              >
                Grid Login
              </a>
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-[#F5A623] hover:bg-[#E09000] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Donate Now
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-100 mt-3">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-gray-600 hover:text-[#006B6B] py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("impact")}
                  className="text-left text-gray-600 hover:text-[#006B6B] py-2"
                >
                  Impact
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-left text-gray-600 hover:text-[#006B6B] py-2"
                >
                  Gallery
                </button>
                <a
                  href={GRID_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-gray-600 hover:text-[#006B6B] py-2"
                >
                  Grid Login
                </a>
                <button
                  onClick={() => scrollToSection("donate")}
                  className="bg-[#F5A623] hover:bg-[#E09000] text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Donate Now
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#006B6B] via-[#008080] to-[#1A365D] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/image5.png')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                Government of Kerala Initiative
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Kerala United Against{" "}
                <span className="text-[#F5A623]">Rare Diseases</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0">
                India&apos;s first state-funded comprehensive care programme for children with rare diseases. 
                Join us in transforming lives through prevention, treatment, and compassionate care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("donate")}
                  className="bg-[#F5A623] hover:bg-[#E09000] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Support the Mission
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/30"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F5A623]/20 rounded-full blur-3xl" />
                <Image
                  src="/kare-logo.jpg"
                  alt="KARE Logo"
                  width={350}
                  height={350}
                  className="relative rounded-full shadow-2xl border-4 border-white/30"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Government Logos Section */}
      <section className="py-12 bg-white">
        <div className="flex items-center gap-4 justify-center max-w-5xl mx-auto px-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-8 md:gap-12">
            <Image
              src="/kare-logo.jpg"
              alt="KARE Logo"
              width={80}
              height={80}
              className="object-contain rounded-full"
            />
            <Image
              src="/Kerala-sarkar-Emblem.png"
              alt="Government of Kerala"
              width={140}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#E6FFFA] text-[#006B6B] border-[#006B6B]/20 mb-4">
              About KARE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Care for Rare Diseases
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              KARE (Kerala United Against Rare Diseases) is a pioneering initiative by the Government of Kerala, 
              making it the first state in India to launch a state-funded treatment programme for rare diseases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Introduction */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#006B6B] to-[#008080] flex items-center justify-center mb-4 shadow-lg">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">Our Beginning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Drawing from the successful experience of the SMA program (2022–2024), the Government of Kerala 
                  launched KARE in 2024. The programme focuses on prevention, early identification, and provision 
                  of treatment along with access to medicines, therapies, and assistive devices.
                </p>
              </CardContent>
            </Card>

            {/* Vision & Mission */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-[#006B6B] text-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-[#F5A623]" />
                    <CardTitle className="text-lg text-white">Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    To create a sustainable model for comprehensive care and treatment access for children 
                    with rare diseases in Kerala.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-[#1A365D] text-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-[#F5A623]" />
                    <CardTitle className="text-lg text-white">Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    To mobilize alternative funding and ensure equitable access to high-cost treatments 
                    for conditions such as SMA, Gaucher, Pompe, MPS, and others.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Objectives */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Uninterrupted Therapy", desc: "Ensure continuous treatment for all eligible patients" },
              { icon: Building2, title: "Holistic Care", desc: "Provide comprehensive care through public health infrastructure" },
              { icon: Users, title: "Transparent Funding", desc: "Build an accountable ecosystem through philanthropy and CSR" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-[#E6FFFA] flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#006B6B]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" ref={statsRef} className="py-20 bg-linear-to-br from-[#006B6B] to-[#1A365D] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Lives Across Kerala
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Kerala&apos;s model has shown that early diagnosis, multidisciplinary care, and timely drug access 
              can transform outcomes in rare diseases.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Diseases Covered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FEF3C7] text-[#92400E] border-[#F5A623]/20 mb-4">
              Diseases Covered
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conditions We Support
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KARE provides comprehensive treatment and support for children affected by these rare diseases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {diseases.map((disease, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#F5A623] to-[#E09000] flex items-center justify-center shadow-lg">
                      <disease.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{disease.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{disease.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#E6FFFA] text-[#006B6B] border-[#006B6B]/20 mb-4">
              Gallery
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Moments of Hope
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing the journey of care, compassion, and community support.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, i) => (
              <button
                key={i}
                onClick={() => setLightbox({ isOpen: true, src: image.src, alt: image.alt })}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#FEF3C7] text-[#92400E] border-[#F5A623]/20 mb-4">
              Support Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Help Transform Lives
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Through KARE, we aim to raise ₹100 crore over the next 3 years to ensure uninterrupted care 
              for existing patients and inclusion of other rare disease categories.
            </p>
          </div>

          <Card className="border-2 border-[#F5A623] shadow-xl pt-0 overflow-hidden">
            <CardHeader className="text-center bg-linear-to-r from-[#FEF3C7] to-[#FDE68A] py-4">
              <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
                <HeartHandshake className="w-7 h-7 text-[#F5A623]" />
                Bank Details for Donation
              </CardTitle>
              <CardDescription className="text-gray-700">
                Your contribution can save a child&apos;s life
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-4">
              <CopyButton label="Bank Name" text="State Bank of India, Trivandrum City (70028)" />
              <CopyButton label="Account Number" text="39229924684" />
              <CopyButton label="IFSC Code" text="SBIN0070028" />
              
              <div className="mt-8 p-4 bg-[#E6FFFA] rounded-lg border border-[#006B6B]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#006B6B] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Government-Backed Initiative</p>
                    <p className="text-sm text-gray-600">
                      KARE is an official programme of the Government of Kerala. All donations directly 
                      support treatment and care for children with rare diseases.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              We invite philanthropists, corporates, and organizations to partner with us in this compassionate mission.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Image
                src="/Kerala-sarkar-Emblem.png"
                alt="Government of Kerala"
                width={80}
                height={60}
                className="object-contain opacity-70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Health Minister Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="border-0 shadow-xl overflow-hidden p-0">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="relative aspect-square md:aspect-auto md:h-auto">
                <Image
                  src="/hm-portrait.png"
                  alt="Health Minister"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;Kerala&apos;s model has shown that early diagnosis, multidisciplinary care, and timely 
                  drug access can transform outcomes in rare diseases like SMA. KARE represents our commitment 
                  to ensuring no child is left behind due to the rarity of their condition.&rdquo;
                </blockquote>
                <cite className="text-[#006B6B] font-semibold text-lg not-italic">
                  Veena George
                  <span className="block text-gray-500 font-normal text-sm">
                    Minister for Health &amp; Family Welfare, Kerala
                  </span>
                </cite>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ isOpen: false, src: "", alt: "" })}
        imageSrc={lightbox.src}
        alt={lightbox.alt}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

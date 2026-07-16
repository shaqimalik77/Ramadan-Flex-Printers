import SmartImage from "./Smartimage";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Mian Mateen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Visionary leader with 15+ years of print industry expertise.",
  },
  {
    name: "Ayesha Malik",
    role: "Sales Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Dedicated sales strategist helping corporate brands scale.",
  },
  {
    name: "Zainab Raza",
    role: "Lead Graphic Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Bringing brand concepts to life with unique visual designs.",
  },
  {
    name: "Kamran Shah",
    role: "Production Supervisor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Overseeing print production to ensure zero-defect quality.",
  },
  {
    name: "Bilal Ahmed",
    role: "Customer Support Lead",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Committed to delivering smooth, timely client communication.",
  },
];

export default function AboutTeam() {
  return (
    <section className="bg-neutral-50 py-10 sm:py-12 md:py-14 border-t border-b border-neutral-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E41F26]">
            Our People
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            Meet the Experts Behind Ramdan Printers
          </h2>
          <p className="mt-2 text-sm text-neutral-500 max-w-xl mx-auto">
            Our dedicated team coordinates design, production, and support to bring you premium customized printing solutions.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center bg-white p-4 rounded-2xl border border-neutral-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Profile Image Frame */}
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-neutral-100 bg-neutral-50 sm:h-28 sm:w-28">
                <SmartImage
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100px, 120px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Bio & Details */}
              <h3 className="mt-4 text-sm sm:text-base font-bold text-neutral-900">
                {member.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold text-[#E41F26]">
                {member.role}
              </p>
              <p className="mt-2 text-[10px] sm:text-[11px] text-neutral-500 leading-normal">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

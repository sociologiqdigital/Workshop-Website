export const programs = [
  {
    id: 1,
    slug: "4-week-live-business",
    label: "Workshop 01",
    title: "4-Week Live Business Program",
    description:
      "A clarity-led live program to help you build digital systems that grow with intention - not noise.",
    points: [
      "Live on Zoom",
      "4 Weeks / 8 Live Sessions",
      "Group mentoring + 1:1 guidance",
    ],
    status: "active", // active | soon | closed
    statusLabel: "Active Now",
    ctaText: "Apply Now",
  },

  {
    id: 2,
    slug: "one-on-one-mentorship",
    label: "Workshop 02",
    title: "1:1 Mentorship",
    description:
      "Personalized guidance for founders who want focused clarity, faster decisions, and tailored execution.",
    points: [
      "Private strategy sessions",
      "Custom action plans",
      "Direct feedback & accountability",
    ],
    status: "soon",
    statusLabel: "Starting Soon",
    ctaText: "Explore",
  },

  {
    id: 3,
    slug: "group-accountability",
    label: "Workshop 03",
    title: "Group Accountability",
    description:
      "Ongoing momentum and consistency through a focused accountability-driven community.",
    points: [
      "Weekly group check-ins",
      "Progress tracking",
      "Collective learning & support",
    ],
    status: "closed",
    statusLabel: "Closed",
    ctaText: "Join",
  },
];

export const programStatusStyles = {
  active: "bg-primary/10 text-primary border-primary/30",
  soon: "bg-amber-100 text-amber-700 border-amber-300",
  closed: "bg-gray-100 text-gray-500 border-gray-300",
};

export const contactInfo = {
  email: "tanyachisepo04@gmail.com",
  phone: "+13864044609",
  phoneDisplay: "+1 (386) 404-4609",
  linkedIn: "https://www.linkedin.com/in/tanyaradzwa-chisepo/",
  linkedInDisplay: "/in/tanyaradzwa-chisepo",
  github: "https://github.com/Talia04",
  githubDisplay: "@Talia04",
} as const;

export function getMailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();

  return `mailto:${contactInfo.email}${query ? `?${query}` : ""}`;
}

export const getContactInfo = () => ({
  ...contactInfo,
  getMailtoLink: () => getMailtoLink(),
  getTelLink: () => `tel:${contactInfo.phone}`,
});

export const openEmail = () => {
  window.location.href = getMailtoLink();
};

export const openPhone = () => {
  window.location.href = `tel:${contactInfo.phone}`;
};

export const openLinkedIn = () => {
  window.open(contactInfo.linkedIn, "_blank", "noopener,noreferrer");
};

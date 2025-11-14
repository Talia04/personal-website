export const getContactInfo = () => {
  // Email
  const emailParts = ['tanyachisepo04', 'gmail', 'com'];
  const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

  // Phone
  const phoneParts = ['1', '386', '383', '1436'];
  const phone = `+${phoneParts[0]}${phoneParts[1]}${phoneParts[2]}${phoneParts[3]}`;

  // LinkedIn
  const linkedInUsername = 'tanyaradzwa-chisepo';
  const linkedIn = `https://www.linkedin.com/in/${linkedInUsername}/`;

  return {
    email,
    phone,
    linkedIn,
    getMailtoLink: () => `mailto:${email}`,
    getTelLink: () => `tel:${phone}`,
  };
};

// Additional protection: Use these functions in onClick handlers
export const openEmail = () => {
  const { email } = getContactInfo();
  window.location.href = `mailto:${email}`;
};

export const openPhone = () => {
  const { phone } = getContactInfo();
  window.location.href = `tel:${phone}`;
};

export const openLinkedIn = () => {
  const { linkedIn } = getContactInfo();
  window.open(linkedIn, '_blank', 'noopener,noreferrer');
};

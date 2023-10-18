export const generateInitials = (fullName: string) => {
  if (!fullName) return '';

  const [firstName, lastName] = fullName.trim().split(' ');

  return [firstName, lastName].reduce(
    (initials, name) =>
      name ? `${initials}${name[0].toUpperCase()}` : initials,
    '',
  );
};

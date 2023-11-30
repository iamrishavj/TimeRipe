const MAX_DEFAULT_LENGTH_DESCRIPTION = 100;

export const truncateDescription = (
  description: string,
  maxLength: number = MAX_DEFAULT_LENGTH_DESCRIPTION
) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

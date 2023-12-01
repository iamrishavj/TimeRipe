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

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function FormattedDate({ date }: { date: string }) {
  return (
    <time dateTime={date} suppressHydrationWarning>
      {formatDate(date)}
    </time>
  );
}

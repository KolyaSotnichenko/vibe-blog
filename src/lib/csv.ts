export function escapeCsvValue(value: string): string {
  if (value.includes('"') || value.includes(",") || value.includes("\n")) {
    return `"${value.replace(/\"/g, '""')}"`;
  }
  return value;
}

export function toCsv(headers: string[], rows: string[][]): string {
  const headerLine = headers.map(escapeCsvValue).join(",");
  const body = rows.map((row) => row.map((cell) => escapeCsvValue(cell)).join(",")).join("\n");
  return [headerLine, body].join("\n");
}

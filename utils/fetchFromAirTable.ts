type Table = "work" | "tasks" | "users";

export const fetchFromAirTable = (table: Table, options: RequestInit) =>
  fetch(`https://api.airtable.com/v0/${process.env.airTableBase}/${table}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.airTableApiKey}`,
      "Content-Type": "application/json",
    },
  }).then((r) => {
    if (!r.ok) {
      throw r;
    }
    return r.json();
  });

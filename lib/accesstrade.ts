export async function createAffLink(url: string) {

  const key = process.env.ACCESSTRADE_API_KEY;
  if (!key) throw new Error("ACCESSTRADE_API_KEY missing");
  const res = await fetch("https://api.accesstrade.vn/v1/deeplink", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": key
    },
    body: JSON.stringify({ url })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error("Accesstrade error: " + t);
  }
  const data = await res.json();
  // Expect { data: { short_url: ... } } depending on API; adjust if needed.
  return data.data?.short_url || data.short_url || url;
}
export { createAffLink as createAFFLink };

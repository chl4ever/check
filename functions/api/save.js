export async function onRequestPost({ request, env }) {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${env.EDITOR_PASSWORD || 'frontline2026'}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  try {
    const data = await request.json();
    if (!data || !data.date) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400, headers });
    const id = data.date.replace(/-/g, '');
    const brief = { ...data, id, createdAt: new Date().toISOString() };
    await env.BRIEFS.put(`brief:${id}`, JSON.stringify(brief));
    const rawIndex = await env.BRIEFS.get('brief:index');
    let index = [];
    try { index = rawIndex ? JSON.parse(rawIndex) : []; } catch(e) { index = []; }
    const existing = index.findIndex(i => i.id === id);
    const entry = { id, date: data.date, headline: data.headline, vol: data.vol || '' };
    if (existing >= 0) index[existing] = entry; else index.unshift(entry);
    await env.BRIEFS.put('brief:index', JSON.stringify(index.slice(0, 100)));
    return new Response(JSON.stringify({ ok: true, id, url: `/brief/${id}` }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } });
}

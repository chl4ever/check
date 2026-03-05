export async function onRequestGet({ request, env }) {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers });
  try {
    const raw = await env.BRIEFS.get(`brief:${id}`);
    if (!raw) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
    return new Response(raw, { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}

export async function onRequestGet({ env }) {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  try {
    const raw = await env.BRIEFS.get('brief:index');
    let index = [];
    try { index = raw ? JSON.parse(raw) : []; } catch(e) { index = []; }
    return new Response(JSON.stringify(index), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}

/* ============================================================
   CONSTRUTAX STUDIO — Supabase data layer
   Integração aditiva e à prova de falha.
   Se o banco estiver inacessível, o Studio continua
   funcionando normalmente com dados locais — sem erro,
   sem tela de falha, sem nada visível.
   ============================================================ */

(function () {
  var SUPABASE_URL = 'https://qomstqmgedpbdonuyjit.supabase.co';
  var SUPABASE_KEY = 'sb_publishable__S4ppqk2vFGJV0ytgMurlA_NL1ol2XA';

  var _client = null;

  function _getClient() {
    if (_client) return _client;
    try {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      }
    } catch (_) { /* silently fail */ }
    return _client;
  }

  /**
   * READ — busca o value de uma linha pelo key.
   * Retorna o valor JSON ou null em caso de falha / ausência.
   */
  async function dbRead(key) {
    try {
      var c = _getClient();
      if (!c) return null;
      var result = await c
        .from('construtax_data')
        .select('value')
        .eq('key', key)
        .maybeSingle();
      if (result.error || !result.data) return null;
      return result.data.value;
    } catch (_) {
      return null;
    }
  }

  /**
   * WRITE — upsert fire-and-forget.
   * Não bloqueia a interface. Falha silenciosamente.
   */
  function dbWrite(key, value) {
    try {
      var c = _getClient();
      if (!c) return;
      c.from('construtax_data')
        .upsert(
          { key: key, value: value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        )
        .then(function () {})
        .catch(function () {});
    } catch (_) { /* silently fail */ }
  }

  window.SupaDB = { read: dbRead, write: dbWrite };
})();

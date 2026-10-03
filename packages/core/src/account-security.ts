import type { SupabaseClient } from "@supabase/supabase-js";

export async function changeCurrentUserPassword(client: SupabaseClient, newPassword: string, confirmation: string) {
  if (newPassword.length < 8) return { data: null, error: new Error("A palavra-passe deve ter pelo menos 8 caracteres.") };
  if (newPassword !== confirmation) return { data: null, error: new Error("As palavras-passe não coincidem.") };
  return client.auth.updateUser({ password: newPassword });
}

export async function requestPasswordReset(client: SupabaseClient, email: string, redirectTo: string) {
  if (!email.trim()) return { data: null, error: new Error("Indique o e-mail da conta.") };
  return client.auth.resetPasswordForEmail(email.trim(), { redirectTo });
}

-- Arena Hub Database Schema
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de torneios
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  game TEXT NOT NULL CHECK (game IN ('League of Legends', 'Valorant', 'CS2', 'Free Fire')),
  prize_amount INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('Online', 'Presencial', 'Híbrido')),
  deadline DATE NOT NULL,
  registration_link TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_email TEXT NOT NULL,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'featured', 'premium')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de perfis de usuários (complementa Clerk)
CREATE TABLE user_profiles (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'team')),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de torneios salvos pelos usuários
CREATE TABLE saved_tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES user_profiles(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reminder_sent BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, tournament_id)
);

-- Índices para melhor performance
CREATE INDEX idx_tournaments_game ON tournaments(game);
CREATE INDEX idx_tournaments_date ON tournaments(date);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_tournaments_tier ON tournaments(tier);
CREATE INDEX idx_tournaments_prize ON tournaments(prize_amount);
CREATE INDEX idx_saved_tournaments_user ON saved_tournaments(user_id);
CREATE INDEX idx_saved_tournaments_tournament ON saved_tournaments(tournament_id);

-- Function para auto-expirar torneios passados
CREATE OR REPLACE FUNCTION expire_old_tournaments()
RETURNS void AS $$
BEGIN
  UPDATE tournaments
  SET status = 'expired'
  WHERE deadline < CURRENT_DATE
  AND status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tournaments_updated_at
BEFORE UPDATE ON tournaments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function para incrementar visualizações
CREATE OR REPLACE FUNCTION increment_tournament_views(tournament_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tournaments
  SET views = views + 1
  WHERE id = tournament_id;
END;
$$ LANGUAGE plpgsql;

-- Habilitar Row Level Security (RLS)
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_tournaments ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para tournaments
CREATE POLICY "Tournaments são visíveis para todos" ON tournaments
  FOR SELECT USING (true);

CREATE POLICY "Qualquer um pode criar torneios" ON tournaments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Organizadores podem atualizar seus torneios" ON tournaments
  FOR UPDATE USING (true);

-- Políticas de segurança para user_profiles
CREATE POLICY "Perfis são visíveis para todos" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar seu próprio perfil" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON user_profiles
  FOR UPDATE USING (true);

-- Políticas de segurança para saved_tournaments
CREATE POLICY "Usuários podem ver seus torneios salvos" ON saved_tournaments
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem salvar torneios" ON saved_tournaments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuários podem remover torneios salvos" ON saved_tournaments
  FOR DELETE USING (true);

-- NOTA: Para agendar a função expire_old_tournaments(), você pode:
-- 1. Usar Supabase Edge Functions com um cron job
-- 2. Usar pg_cron se disponível no seu plano
-- 3. Chamar a função manualmente ou via API
-- Exemplo com pg_cron (se disponível):
-- SELECT cron.schedule('expire-tournaments', '0 0 * * *', 'SELECT expire_old_tournaments()');

-- Arena Hub Seed Data
-- Execute este script após o schema.sql para popular o banco com dados de exemplo

INSERT INTO tournaments (name, game, prize_amount, date, time, format, deadline, registration_link, organizer_name, organizer_email, tier, status) VALUES

-- League of Legends
('Copa Summoner Brasil 2026', 'League of Legends', 5000, '2026-03-15', '14:00', 'Online', '2026-03-10', 'https://example.com/copa-summoner', 'GamersUnited', 'contato@gamersunited.com.br', 'featured', 'active'),
('LoL Amateur League - Série A', 'League of Legends', 1500, '2026-03-22', '19:00', 'Online', '2026-03-18', 'https://example.com/lol-amateur', 'ESports Brasil', 'torneios@esportsbrasil.com', 'free', 'active'),

-- Valorant
('Valorant Rising Stars Cup', 'Valorant', 3000, '2026-03-08', '15:00', 'Online', '2026-03-05', 'https://example.com/valorant-rising', 'Riot Community', 'community@riot.com.br', 'featured', 'active'),
('Vanguard Open Championship', 'Valorant', 800, '2026-04-01', '18:00', 'Presencial', '2026-03-25', 'https://example.com/vanguard-open', 'Arena São Paulo', 'eventos@arenasp.com.br', 'free', 'active'),

-- CS2
('CS2 Pro Amateur League', 'CS2', 10000, '2026-03-20', '16:00', 'Híbrido', '2026-03-15', 'https://example.com/cs2-pro-amateur', 'Counter Strike Brasil', 'liga@csbrasil.com', 'premium', 'active'),
('Dust2 Masters', 'CS2', 2000, '2026-03-12', '20:00', 'Online', '2026-03-08', 'https://example.com/dust2-masters', 'FPS Gaming', 'torneios@fpsgaming.com.br', 'free', 'active'),

-- Free Fire
('Free Fire Copa das Favelas', 'Free Fire', 1000, '2026-03-10', '17:00', 'Online', '2026-03-07', 'https://example.com/copa-favelas', 'Garena Brasil', 'eventos@garena.com.br', 'free', 'active'),
('Booyah Championship 2026', 'Free Fire', 5000, '2026-03-25', '14:00', 'Presencial', '2026-03-20', 'https://example.com/booyah-champ', 'Free Fire Esports', 'championship@freefire.com', 'featured', 'active'),

-- Torneios mais distantes
('Summer League - Multi Games', 'League of Legends', 15000, '2026-04-15', '13:00', 'Híbrido', '2026-04-10', 'https://example.com/summer-league', 'Gaming Events BR', 'summer@gamingevents.com.br', 'premium', 'active'),
('Valorant Community Cup', 'Valorant', 500, '2026-04-05', '19:30', 'Online', '2026-04-01', 'https://example.com/community-cup', 'Valorant BR Community', 'cup@valbr.com', 'free', 'active');

-- Criar um perfil de usuário de exemplo para testes
INSERT INTO user_profiles (id, username, tier, points) VALUES
('user_test_123', 'TestPlayer', 'free', 100);

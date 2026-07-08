create table publicacoes (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('artigo', 'paper', 'pdf')),
  titulo text not null,
  resumo text,
  data date not null,
  slug text not null unique,
  conteudo text,
  href_externo text,
  arquivo_path text,
  publicado boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table publicacoes enable row level security;

create policy "Leitura pública de publicados"
  on publicacoes for select
  using (publicado = true);

create policy "Admin lê tudo"
  on publicacoes for select
  to authenticated
  using (true);

create policy "Admin insere"
  on publicacoes for insert
  to authenticated
  with check (true);

create policy "Admin atualiza"
  on publicacoes for update
  to authenticated
  using (true);

create policy "Admin deleta"
  on publicacoes for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public) values ('pdfs', 'pdfs', false);

create policy "Leitura pública de PDFs"
  on storage.objects for select
  using (bucket_id = 'pdfs');

create policy "Admin faz upload de PDFs"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'pdfs');

create policy "Admin deleta PDFs"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'pdfs');

insert into publicacoes (tipo, data, titulo, resumo, slug, href_externo, publicado) values
  ('artigo', '2026-07-01', 'Profissionalizar a Formação: uma proposta de Sistema Nacional para a base do futebol brasileiro',
   'Policy paper: diagnóstico do amadorismo estrutural da base, benchmarks (Alemanha, Inglaterra, Bélgica e o fracasso do dossiê Baggio) e a arquitetura de um Sistema Nacional de Formação em sete pilares.',
   'sistema-nacional-de-formacao', null, true),
  ('paper', '2026-03-01', 'SENTINELA-TREVO v9: federated learning for behavioral detection of early pornographic exposure in minors',
   'Preprint (SSRN). Formaliza o Equity Paradox e o trilema privacidade–utilidade–equidade em detecção comportamental preservando privacidade.',
   'sentinela-trevo-v9', 'https://doi.org/10.2139/ssrn.6461080', true);

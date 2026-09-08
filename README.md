# Site Velattus — versão estática (sem servidor, sem banco de dados)

Esta é a versão simplificada do site: sem painel administrativo, sem login,
sem banco de dados. Só arquivos HTML, CSS, JS e imagens — o tipo de site
mais simples e barato de existir de se hospedar, porque não precisa de
nenhum servidor rodando o tempo todo.

Isso significa que **hospedagem 100% gratuita para sempre é uma opção real**
(GitHub Pages, Cloudflare Pages, Netlify), sem os limites que existem nos
planos gratuitos de hospedagem de aplicações (sem "dormir", sem apagar
dados, sem pedir cartão de crédito).

O preço dessa simplicidade: como não há mais painel administrativo, para
mudar um produto do catálogo (preço, foto, texto, adicionar ou remover uma
flor) é preciso editar um arquivo e publicar de novo — não dá mais para
fazer isso pelo navegador.

## O que mudou em relação à versão com painel administrativo

- Removidos: pasta `admin/`, pasta `server/`, banco de dados, login,
  upload de imagem pelo navegador, estatísticas de visitas/cliques.
- O catálogo de flores (25 produtos reais, 7 categorias) continua
  exatamente igual, só que os dados agora ficam fixos no arquivo
  `js/produtos-data.js` em vez de num banco de dados.
- O número de WhatsApp e o nome da empresa também ficaram fixos, no
  arquivo `js/site.js`.
- A página inicial passou a se chamar `index.html` (era `inicio.html`),
  porque é o nome que toda hospedagem de site estático espera encontrar.

Se um dia vocês quiserem o painel administrativo de volta (cadastrar
produtos pelo navegador, ver estatísticas de visitas), a versão completa
com backend real continua existindo — é só usar aquele outro projeto e
hospedar em um serviço pago (~US$7/mês) ou num servidor próprio.

## Como editar o catálogo de flores

Abra `js/produtos-data.js`. Lá tem dois arrays:

- `VELATTUS_CATEGORIAS`: as 7 categorias (id, nome).
- `VELATTUS_PRODUTOS`: os produtos. Cada um tem `nome`, `descricao`,
  `medida`, `preco` (texto pronto, ex: `"R$ 199,90"` — ou `null` para
  aparecer "Consulte o valor"), `categoria`, `categoria_id`, `imagem`
  (caminho dentro da pasta `imagens/`) e `destaque` (`true` para aparecer
  na vitrine de destaques da página do catálogo, no máximo 4 produtos).

Para adicionar uma flor nova:
1. Coloque a foto dentro da pasta `imagens/`.
2. Copie um bloco de produto existente dentro do array `VELATTUS_PRODUTOS`
   e ajuste os campos (não esqueça de dar um `id` novo, que não exista
   ainda em nenhum outro produto).
3. Salve, teste localmente (veja abaixo) e publique de novo.

Para remover ou editar, é só apagar ou mudar o bloco correspondente.

## Como ver o site no seu computador antes de publicar

Não dá para simplesmente abrir o `index.html` clicando duas vezes (o
navegador bloqueia o carregamento dos arquivos `.js` por segurança). É
preciso servir a pasta com um servidor bem simples. Com Python instalado
(a maioria dos computadores já tem):

```
cd velattus-static
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. Aperte `Ctrl+C` no
terminal para parar.

## Como publicar (GitHub Pages — grátis para sempre)

Veja o guia completo publicado na conversa, que já traz os comandos
prontos para copiar. Resumo dos passos:

1. Crie um repositório no GitHub e envie esta pasta para lá (`git init`,
   `git add .`, `git commit`, `git push`).
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, selecione a branch
   `main` e a pasta `/ (root)`. Salve.
4. Em 1–2 minutos o GitHub mostra o endereço público do site (algo como
   `https://seu-usuario.github.io/velattus-site/`).

Não tem build, não tem variável de ambiente, não tem plano pago, não tem
"dormir depois de 15 minutos" — é só arquivo estático mesmo.

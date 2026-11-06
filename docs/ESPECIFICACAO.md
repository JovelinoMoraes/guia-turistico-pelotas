# Especificação Técnica — Guia Turístico de Pelotas

**Status:** Documento inicial de produto e arquitetura  
**Versão:** 1.0  
**Idioma do produto:** Português do Brasil (`pt-BR`)  
**Localidade principal:** Pelotas, Rio Grande do Sul, Brasil  
**Fuso horário:** `America/Sao_Paulo`  
**Nome de trabalho:** Guia Turístico de Pelotas (nome e identidade final ainda podem ser definidos)

---

## 1. Visão do produto

Desenvolver um guia turístico digital, responsivo e acessível que ajude moradores e visitantes a descobrir o que conhecer, onde comer e como se orientar em Pelotas/RS.

O produto deve transmitir a identidade cultural da cidade, valorizando patrimônio histórico, arquitetura, gastronomia, espaços públicos e experiências locais. A experiência deve ser simples para quem está visitando a cidade pela primeira vez e útil para quem já mora nela.

Não deve parecer apenas uma lista de estabelecimentos. Deve funcionar como um portal local confiável, visualmente consistente e fácil de atualizar.

### Objetivos principais

1. Apresentar informações úteis sobre Pelotas em uma interface clara.
2. Descobrir pontos turísticos por meio de imagens, descrições e informações práticas.
3. Encontrar restaurantes, bares, cafeterias e outros locais de alimentação.
4. Facilitar a navegação até os locais por meio de links para mapas.
5. Exibir condições meteorológicas e recomendações simples para o dia.
6. Preparar a arquitetura para receber um painel administrativo futuramente, sem implementar esse painel na primeira versão.

### Público

- Turistas que estão planejando ou realizando uma visita a Pelotas.
- Moradores que desejam descobrir lugares e atividades na cidade.
- Pessoas que procuram opções de alimentação e informações de localização.

---

## 2. Escopo da primeira versão (MVP)

### Incluído

- Página inicial com apresentação do guia.
- Resumo meteorológico atual e previsão para o dia.
- Recomendações contextuais sobre chuva, frio e calor.
- Área de turismo com listagem e detalhes de pontos turísticos.
- Área de gastronomia com listagem e detalhes de estabelecimentos.
- Busca textual e filtros básicos.
- Endereço e ação para abrir a localização em um serviço de mapas.
- Layout responsivo para celular, tablet e desktop.
- Metadados básicos para compartilhamento e mecanismos de busca.
- Estados de carregamento, erro e ausência de resultados.
- Conteúdo inicial mantido em arquivos locais tipados.

### Fora do escopo inicial

- Cadastro e login de usuários.
- Painel administrativo.
- Cadastro público de estabelecimentos.
- Avaliações, comentários, curtidas ou favoritos sincronizados.
- Reservas, pedidos, pagamentos ou cupons.
- Aplicativo móvel nativo.
- Rastreamento da localização do visitante.
- Rotas próprias ou navegação turn-by-turn.
- Integração com sistemas de reservas.

Esses itens só devem ser adicionados após uma decisão explícita de produto.

---

## 3. Identidade visual e experiência

### Direção visual: cultural, editorial e acolhedora

A interface deve evocar a história e a arquitetura de Pelotas sem cair em uma estética antiga, excessivamente ornamentada ou caricata.

Princípios:
- Fotografia de qualidade como elemento importante da experiência.
- Cores inspiradas em fachadas históricas, tijolos, pedra, vegetação e papel.
- Tipografia com personalidade nos títulos e alta legibilidade nos textos.
- Espaçamento generoso e hierarquia visual consistente.
- Cartões com imagens, títulos e informações essenciais.
- Ícones discretos e consistentes.
- Animações sutis, nunca necessárias para compreender ou utilizar a interface.

### Paleta inicial sugerida

Tratar os valores como tokens centralizados, fáceis de ajustar após a implementação visual.

| Token | Cor | Uso |
|---|---|---|
| `color-ink` | `#29251F` | Texto principal |
| `color-paper` | `#F7F3EA` | Fundo principal |
| `color-sand` | `#E8DDCA` | Superfícies secundárias |
| `color-brick` | `#9B4F3D` | Cor de destaque cultural |
| `color-olive` | `#66745A` | Destaques naturais e apoio |
| `color-muted` | `#756F65` | Texto secundário |
| `color-border` | `#D9D0C2` | Bordas e divisores |

Não espalhar códigos hexadecimais pelos componentes. Definir tokens CSS e reutilizá-los.

### Tipografia

Escolher no máximo duas famílias:
- Uma fonte de títulos com personalidade editorial, mas legível.
- Uma fonte sem serifa para interface, textos longos, formulários e dados.

Carregar fontes com estratégia que evite bloquear a renderização. Garantir fallbacks do sistema.

### Responsividade

Começar pelo mobile. A interface deve funcionar sem rolagem horizontal em larguras pequenas.

- Mobile: navegação compacta, cartões em uma coluna e ações fáceis de tocar.
- Tablet: grades com duas colunas quando houver espaço.
- Desktop: conteúdo centralizado, grades mais amplas e navegação completa.
- Imagens devem manter proporção adequada e usar carregamento otimizado.
- Não esconder informações essenciais apenas em interações de hover.

### Acessibilidade

- HTML semântico.
- Contraste adequado entre texto e fundo.
- Navegação por teclado e foco visível.
- Rótulos acessíveis para campos e botões.
- Texto alternativo descritivo nas imagens relevantes.
- Não comunicar alertas apenas por cor.
- Respeitar `prefers-reduced-motion`.
- Alvos de toque confortáveis em dispositivos móveis.

---

## 4. Estrutura de navegação e páginas

### Navegação principal

- Início
- Turismo
- Gastronomia
- Sobre Pelotas (página institucional simples ou seção, conforme o design final)

A navegação deve deixar claro em qual seção o visitante está. Evitar excesso de itens no menu.

### 4.1 Página inicial (`/`)

Seções sugeridas, nesta ordem:

1. **Cabeçalho:** marca, navegação e ação de busca, se fizer sentido.
2. **Hero:** mensagem curta que convide a descobrir Pelotas, acompanhada de fotografia representativa.
3. **Clima de Pelotas:** temperatura atual, condição resumida, máxima/mínima ou previsão do dia e recomendação contextual.
4. **Descubra Pelotas:** seleção editorial de pontos turísticos.
5. **Onde comer:** seleção de restaurantes, bares e cafeterias.
6. **Chamada para explorar:** links claros para as listagens completas.
7. **Rodapé:** navegação, informações do projeto e créditos de imagens/fontes quando aplicável.

A página inicial deve ter conteúdo útil mesmo quando o serviço meteorológico estiver indisponível.

### 4.2 Turismo (`/turismo`)

- Título e introdução curta.
- Busca por nome ou descrição.
- Filtros por categoria, quando houver dados suficientes.
- Grade de cartões.
- Estado sem resultados.
- Paginação ou carregamento progressivo apenas se a quantidade de conteúdo justificar.

Categorias iniciais possíveis:
- Patrimônio histórico e arquitetura.
- Praças e espaços públicos.
- Museus e cultura.
- Natureza e lazer.
- Experiências e outros.

Não criar categorias vazias apenas para preencher a interface.

### 4.3 Detalhe turístico (`/turismo/[slug]`)

Exibir, quando houver informação:
- Nome.
- Galeria ou imagem principal.
- Descrição.
- Categoria.
- Endereço ou referência de localização.
- Horários de visita, quando confirmados.
- Informações de acesso e observações úteis.
- Link para abrir no mapa.
- Sugestões relacionadas.

Não inventar horários, preços, acessibilidade, contatos ou condições de visita. Se uma informação não estiver confirmada, omiti-la ou identificá-la claramente como não informada.

### 4.4 Gastronomia (`/gastronomia`)

Listar estabelecimentos em categorias como:
- Restaurantes.
- Bares.
- Cafeterias.
- Docerias e confeitarias.
- Outros, quando necessário.

Filtros possíveis:
- Categoria.
- Nome.
- Bairro, somente se os dados forem confiáveis.

Cada cartão deve apresentar nome, categoria, imagem (se disponível), breve descrição e ação para ver detalhes/localização.

### 4.5 Detalhe gastronômico (`/gastronomia/[slug]`)

Exibir, quando disponível:
- Nome e categoria.
- Imagem.
- Descrição.
- Endereço.
- Bairro.
- Horário de funcionamento confirmado.
- Telefone ou site oficial, se fornecidos e verificados.
- Link para abrir no mapa.

Não afirmar que um estabelecimento está aberto agora sem uma fonte atualizada e confiável. Na primeira versão, é preferível apresentar horários cadastrados como informação de referência, sem status dinâmico de funcionamento.

### 4.6 Página institucional (`/sobre`)

Explicar o propósito do guia, a valorização da cidade e como reportar uma informação desatualizada. Não publicar dados de contato fictícios.

---

## 5. Clima e recomendações

### Fonte sugerida

Utilizar a API pública Open-Meteo para obter condições meteorológicas, sujeita à conferência dos termos e limites de uso vigentes antes da publicação.

Coordenadas de referência aproximadas do centro de Pelotas:
- Latitude: `-31.7654`
- Longitude: `-52.3376`

Parâmetros esperados:
- Temperatura atual.
- Código/descrição da condição meteorológica.
- Probabilidade de precipitação, se disponível.
- Precipitação prevista.
- Temperatura máxima e mínima do dia.
- Fuso horário `America/Sao_Paulo`.
- Unidades em Celsius e milímetros.

A integração deve ficar isolada em um módulo de serviço, não diretamente nos componentes visuais.

### Recomendações contextuais

Criar regras simples, centralizadas e configuráveis. Valores abaixo são pontos de partida de produto, não alertas meteorológicos oficiais:

- **Chuva:** se a probabilidade de precipitação atingir um limite configurável (por exemplo, 40%) ou houver precipitação prevista relevante, sugerir: “Há possibilidade de chuva. Vale levar um guarda-chuva.”
- **Frio:** se a temperatura atual ou mínima prevista ficar abaixo de um limite configurável (por exemplo, 15 °C), sugerir: “A temperatura deve ficar mais baixa. Leve um agasalho.”
- **Calor:** se a temperatura atingir um limite configurável (por exemplo, 28 °C), sugerir hidratação e proteção solar.
- **Sem alerta relevante:** mostrar uma mensagem neutra e agradável, sem criar recomendações artificiais.

As regras devem considerar a previsão do período correspondente. Não emitir uma recomendação de chuva apenas porque há chuva em um horário distante, sem deixar claro que se trata da previsão do dia.

### Resiliência

- Buscar os dados pelo servidor, por meio de uma rota interna ou função de servidor.
- Definir cache/revalidação para evitar chamadas desnecessárias.
- Tratar timeout, resposta inválida e indisponibilidade.
- Mostrar “Não foi possível atualizar o clima agora” em vez de inventar ou manter informação antiga como se fosse atual.
- Informar o horário da última atualização quando possível.
- Não expor chaves secretas no navegador. Se a API não exigir chave, não criar uma variável secreta desnecessária.
- Não tornar a página inteira dependente da API meteorológica.

---

## 6. Mapas e endereços

Na primeira versão, usar links externos para abrir a localização, evitando custos e complexidade de mapas interativos.

Cada registro deve guardar, sempre que possível:
- Endereço legível.
- Latitude.
- Longitude.
- URL de referência ou fonte de verificação dos dados.

Gerar a URL de mapas a partir das coordenadas, quando existirem; caso contrário, usar o endereço codificado corretamente. A geração deve ficar em uma função utilitária única.

Exemplo de destino:
- Google Maps: busca por coordenadas ou endereço.
- OpenStreetMap: link para visualizar coordenadas, quando adequado.

Não fabricar coordenadas. Se a localização não estiver confirmada, mostrar o endereço sem oferecer um link que possa levar a um lugar errado.

Um mapa incorporado pode ser considerado posteriormente, após avaliar privacidade, desempenho, atribuição e termos do provedor.

---

## 7. Conteúdo e qualidade dos dados

A primeira versão utilizará conteúdo local em arquivos tipados, organizado para facilitar futura migração para banco de dados.

### Regras editoriais

- Priorizar informações verificáveis e relevantes para visitantes.
- Escrever descrições originais, objetivas e naturais.
- Não inventar estabelecimentos, endereços, horários, preços ou fatos históricos.
- Registrar a fonte e a data de conferência dos dados quando possível.
- Usar imagens próprias, licenciadas ou com permissão de uso.
- Guardar créditos e atribuições necessários.
- Evitar copiar textos ou imagens de outros sites sem autorização.
- Criar uma forma simples de identificar conteúdo pendente de revisão.

### Modelo conceitual — ponto turístico

```ts
type TouristAttraction = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: string;
  address?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  image?: {
    src: string;
    alt: string;
    credit?: string;
  };
  gallery?: Array<{
    src: string;
    alt: string;
    credit?: string;
  }>;
  visitingHours?: string;
  practicalInfo?: string[];
  sourceUrl?: string;
  lastVerifiedAt?: string;
  featured: boolean;
};
```

### Modelo conceitual — estabelecimento

```ts
type FoodPlace = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description?: string;
  category: "restaurante" | "bar" | "cafeteria" | "doceria" | "outro";
  address: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  image?: {
    src: string;
    alt: string;
    credit?: string;
  };
  openingHours?: string;
  phone?: string;
  websiteUrl?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
  featured: boolean;
};
```

Os tipos são uma referência inicial. Ajustá-los conforme a implementação, sem duplicar modelos desnecessariamente.

---

## 8. Arquitetura e tecnologias recomendadas

### Stack sugerida

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js com App Router | Rotas, renderização no servidor e boa base para SEO |
| Linguagem | TypeScript | Tipagem e manutenção |
| UI | React | Componentização |
| CSS | Tailwind CSS | Consistência e velocidade de implementação |
| Componentes | Componentes próprios; biblioteca acessível apenas se agregar valor | Evitar aparência genérica e dependências desnecessárias |
| Ícones | Lucide | Conjunto consistente |
| Clima | Open-Meteo | Fonte meteorológica inicial |
| Mapas | Links Google Maps/OpenStreetMap | Simples e sem mapa pesado na primeira versão |
| Conteúdo MVP | Arquivos TypeScript/JSON validados | Sem infraestrutura de banco no início |
| Hospedagem | Vercel ou plataforma compatível com Next.js | Deploy simplificado |

As versões das dependências devem ser escolhidas e instaladas na inicialização do projeto, verificando compatibilidade entre si. Não fixar versões antigas por copiar tutoriais.

### Organização sugerida

```text
src/
  app/
    page.tsx
    layout.tsx
    turismo/
      page.tsx
      [slug]/
        page.tsx
    gastronomia/
      page.tsx
      [slug]/
        page.tsx
    sobre/
      page.tsx
    api/
      weather/
        route.ts
  components/
    layout/
    home/
    weather/
    tourism/
    gastronomy/
    ui/
  data/
    attractions.ts
    food-places.ts
  lib/
    weather/
    maps/
    seo/
    utils/
  types/
    attraction.ts
    food-place.ts
  styles/
    globals.css
public/
  images/
docs/
  ESPECIFICACAO.md
AGENTS.md
```

Ajustar a estrutura se a versão do Next.js escolhida adotar convenções diferentes. Evitar criar pastas vazias ou abstrações sem necessidade.

### Diretrizes de arquitetura

- Componentes de interface não devem conter lógica de acesso à API.
- Regras de recomendação meteorológica devem ficar em módulo próprio e testável.
- Dados de conteúdo devem ter tipos definidos.
- Funções de mapas e formatação devem ser reutilizáveis.
- Preferir Server Components por padrão; usar Client Components apenas quando houver interação que exija estado/eventos no navegador.
- Não criar uma API interna para dados estáticos sem necessidade.
- Não adicionar banco de dados na primeira versão.
- Manter os limites entre interface, dados e serviços claros, sem excesso de camadas.

---

## 9. Preparação para painel administrativo futuro

O painel administrativo não será desenvolvido no MVP. A arquitetura, porém, deve evitar decisões que tornem sua inclusão difícil.

Na futura versão, considerar:
- Supabase Database para armazenar atrações e estabelecimentos.
- Supabase Auth para autenticação de administradores.
- Políticas de segurança no banco (RLS) com acesso restrito.
- Perfis e permissões de administração.
- Cadastro, edição, publicação, arquivamento e revisão de registros.
- Upload de imagens com validação de tipo e tamanho.
- Histórico de atualização e data de verificação.
- Validação dos dados no servidor.

Não implementar login fictício, botões administrativos sem ação ou tabelas vazias no MVP. Criar uma camada de acesso a dados simples, para que a origem local possa ser substituída por um repositório de banco de dados futuramente sem reescrever os componentes de interface.

---

## 10. SEO, desempenho e compartilhamento

- Definir título e descrição próprios para cada página.
- Usar URLs legíveis com slugs.
- Gerar metadados Open Graph para compartilhamento.
- Criar sitemap e robots.txt.
- Utilizar imagens otimizadas e dimensões adequadas.
- Priorizar carregamento rápido em conexões móveis.
- Evitar bibliotecas grandes quando uma solução nativa for suficiente.
- Usar dados estruturados apenas quando corretos e compatíveis com o conteúdo real.
- Não prometer posição em mecanismos de busca.

---

## 11. Segurança e privacidade

- Não solicitar localização do usuário na primeira versão.
- Não coletar dados pessoais sem necessidade.
- Não armazenar chaves privadas no código cliente.
- Validar e sanitizar dados de entrada quando houver busca ou parâmetros.
- Não inserir HTML fornecido por conteúdo externo sem sanitização.
- Manter dependências atualizadas.
- Não implementar autenticação até existir uma funcionalidade administrativa real.
- Respeitar termos de uso, licenças e atribuição de APIs e imagens.

---

## 12. Testes e critérios de aceite

### Testes mínimos

- Testes unitários das regras meteorológicas.
- Testes unitários da geração de links de mapas.
- Testes das funções de busca e filtros.
- Testes de componentes essenciais.
- Verificação manual em celular, tablet e desktop.
- Verificação de navegação por teclado e foco.
- Verificação de páginas com dados ausentes.
- Verificação do comportamento quando a API de clima falhar.

### Critérios de aceite do MVP

1. A página inicial carrega sem depender da API de clima.
2. A temperatura e a previsão são exibidas quando a API responde corretamente.
3. A indisponibilidade da API gera estado de erro amigável.
4. As recomendações meteorológicas seguem regras documentadas e testadas.
5. A listagem de turismo permite encontrar e abrir os detalhes de uma atração.
6. A listagem de gastronomia permite filtrar/buscar e abrir os detalhes de um estabelecimento.
7. Endereços e links de mapas são coerentes com os dados cadastrados.
8. Nenhuma informação não confirmada é apresentada como fato.
9. A interface é utilizável em telas pequenas e grandes.
10. Não existem links, botões ou filtros que aparentem funcionar, mas não executem ação.
11. O projeto passa por lint, verificação de tipos e build de produção.
12. O conteúdo tem fontes e créditos quando necessários.

---

## 13. Plano de desenvolvimento

Executar em etapas pequenas, validando cada uma antes de avançar.

### Etapa 1 — Fundação
- Criar projeto Next.js com TypeScript.
- Configurar Tailwind e estrutura base.
- Criar layout, tokens visuais e navegação.
- Definir componentes básicos e responsividade.

### Etapa 2 — Conteúdo
- Definir tipos.
- Criar dados iniciais verificados.
- Implementar listagens de turismo e gastronomia.
- Implementar páginas de detalhes, busca e filtros.

### Etapa 3 — Clima
- Criar integração server-side com Open-Meteo.
- Implementar formatação dos dados.
- Implementar recomendações contextuais.
- Implementar cache e estados de erro/carregamento.
- Testar regras.

### Etapa 4 — Acabamento
- Melhorar SEO e metadados.
- Otimizar imagens e desempenho.
- Revisar acessibilidade.
- Testar dispositivos e fluxos.
- Corrigir problemas antes do deploy.

### Etapa 5 — Publicação
- Configurar repositório e deploy.
- Conferir variáveis de ambiente.
- Validar build de produção.
- Testar as páginas publicadas e links externos.

Não iniciar uma etapa posterior com erros importantes da etapa atual.

---

## 14. Decisões ainda abertas

Não inventar decisões para estes itens. Apresentar opções e pedir confirmação quando forem necessárias:

- Nome e logotipo definitivos.
- Domínio do site.
- Fontes finais e ajustes da paleta.
- Lista inicial de atrações e estabelecimentos com fontes verificadas.
- Política de curadoria e frequência de revisão dos dados.
- Limiares finais das recomendações de clima.
- Serviço de mapas preferido, caso se deseje mapa incorporado.
- Política de contribuição/correção de informações pelo público.

---

## 15. Princípio de produto

A prioridade é entregar um guia confiável, bonito, rápido e fácil de usar. É melhor publicar menos lugares com informações corretas do que uma grande lista com dados duvidosos.

Toda funcionalidade deve resolver uma necessidade real do visitante. Não adicionar complexidade apenas para tornar a arquitetura aparentemente mais sofisticada.

# GameVault — Frontend

Resumo
Este repositório contém apenas a interface front-end do GameVault: páginas estáticas em HTML, estilos em CSS e scripts em JavaScript usados para visualizar o catálogo de jogos e consoles.

Status

- Front-end estático (apenas visualização — GET e GET por ID).
- A API que fornece os dados está hospedada separadamente; este README foca somente no front-end.

Como clonar

```bash
git clone https://github.com/nunezada08/gameVault-projetoFinal-frontend.git
cd gameVault-projetoFinal-frontend
```

Executar localmente

- Você pode abrir `index.html` diretamente no navegador.
- Para evitar problemas com `fetch`/CORS e para desenvolvimento, execute um servidor local:

```bash
# VS Code: instale a extensão Live Server e clique em "Go Live".

# Node.js (http-server)
npm install
http-server -p 5500

# Ou use o pacote `serve` (simples e leve)
npm install -g serve
serve -p 5500

# Depois abra: http://localhost:5500
```

Onde estão os arquivos principais

- `index.html` — página principal com a listagem de jogos.
- `pages/` — páginas secundárias (detalhes, filtros, login, etc.).
- `assets/styles/` — arquivos CSS organizados por página.
- `assets/images/` — imagens e ícones.
- `assets/scripts/` — scripts JavaScript que fazem as requisições e renderizam a interface.

Notas rápidas

- Dados, validações e população dos itens (100+ jogos) são responsabilidade da API hospedada.
- Este repositório não contém código de backend ou scripts de seed.

Contribuição

- Faça uma branch, implemente as mudanças e abra um Pull Request com descrição das alterações.

Contato

- Equipe GameVault

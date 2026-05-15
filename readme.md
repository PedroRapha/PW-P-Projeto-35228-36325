1. Hierarquia com Títulos (Headings)
Use o # para criar separação visual clara. Quanto mais #, menor o título.

Markdown
# Título Principal (H1)
## Seção (H2)
### Subseção (H3)
2. Ênfase no Texto
Negrito: Use texto para destacar palavras-chave.

Itálico: Use *texto* para termos estrangeiros ou notas.

~~Riscado:~~ Use ~~texto~~ para itens removidos ou concluídos.

3. Blocos de Código (O toque "Pro")
Para que o código fique colorido e legível, sempre indique a linguagem após as três crases:
```javascript
const cozinha = "organizada";
```

4. Uso de Emojis 💡
Os emojis ajudam a criar pontos de foco e deixam a leitura menos cansativa.

🚀 para instalação.

🛠️ para tecnologias.

✅ para funcionalidades concluídas.

⚠️ para avisos importantes.
(No Windows, use Win + . e no Mac Cmd + Ctrl + Espaço para abrir o seletor).



# 🍳 Culinary Management API

Sistema de gestão culinária focado na organização de receitas, ingredientes e planejamento de estoque. Projeto desenvolvido com foco em escalabilidade e boas práticas de arquitetura.

## 🛠 Tecnologias e Ferramentas

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (via Supabase)
- **Linguagem:** JavaScript
- **Logs & CORS:** Morgan & Cors
- **Gestão de Variáveis:** Dotenv

## 📂 Estrutura do Projeto (Fase Inicial)

O projeto segue o padrão **MVC (Model-View-Controller)** com uma camada adicional de **Services** para isolar a lógica de negócio.

```text
src/
├── prisma/          # Configuração (Prisma Client)
├── controllers/     # Orquestração das requisições HTTP
├── middlewares/     # Tratamento de erros, validações e segurança
├── routes/          # Definição dos endpoints da API
├── services/        # Regras de negócio e integração com banco

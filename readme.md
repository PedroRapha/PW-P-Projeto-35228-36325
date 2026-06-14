# 🍽️ Receitas de Culinária com Ingredientes e Passos

Projeto final da Unidade Curricular de Programação Web — CTeSP TPSI, IPVC.

Aplicação fullstack para guardar, organizar e partilhar receitas de culinária com lista de ingredientes, instruções passo a passo e fotografia.

**Autores:** Liedson José Buaró Sanca (35228) · Pedro Raphael Lima de Paiva (36325)

---

## 🔗 Links

- **Repositório:** `https://github.com/PedroRapha/PW-P-Projeto-35228-36325`
- **Deploy (Frontend):** `https://pw-projeto-receitas-takenote-fronte.vercel.app`
- **Deploy (Backend/API):** `https://pw-projeto-receitas-takenote-backen.vercel.app`

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|------------|
| Backend | Node.js + Express |
| ORM | Prisma |
| Base de Dados | PostgreSQL |
| Autenticação | JWT + bcrypt |
| Frontend | React + Vite |
| Imagens | Cloudinary |

---

## ⚙️ Pré-requisitos

Antes de instalar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)
- Uma base de dados PostgreSQL (local ou remota)

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/PedroRapha/PW-P-Projeto-35228-36325
```

---

### 2. Backend

#### 2.1 Instalar dependências

```bash
cd back-end
npm install
```

#### 2.2 Configurar variáveis de ambiente

Crie um ficheiro `.env` na raiz da pasta `back-end` com base no `.env.example`:

```env
DATABASE_URL=postgresql://utilizador:palavra-passe@host:5432/nome-da-base-de-dados
JWT_SECRET=uma-chave-secreta-qualquer
JWT_EXPIRES=7d
SERVER_PORT=4242
```

#### 2.3 Executar as migrações da base de dados

```bash
npx prisma migrate dev
```

#### 2.4 Popular a base de dados com dados iniciais (seed)

```bash
npm run seed
```

> ⚠️ O seed apaga todos os dados existentes e recria os dados de base (categorias, dificuldades, medidas e ingredientes). Deve ser executado apenas uma vez na primeira instalação.

#### 2.5 Iniciar o servidor

```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

O servidor fica disponível em `http://localhost:4242`.

---

### 3. Frontend

#### 3.1 Instalar dependências

```bash
cd front-end
npm install
```

#### 3.2 Configurar variáveis de ambiente

Crie um ficheiro `.env` na raiz da pasta `front-end` com base no `.env.example`:

```env
VITE_API_URL=http://localhost:4242
```

> ℹ️ Se estiver a usar o backend em produção em vez de local, substitua pelo URL do deploy, incluindo o `https://`.

#### 3.3 Iniciar a aplicação

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

---

## 👤 Conta de Administrador

Para testar as funcionalidades de administrador (aprovação de ingredientes), é necessário promover um utilizador ao papel `ADMIN` diretamente na base de dados:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'email-do-utilizador@exemplo.com';
```

---

## 📬 Coleção Postman

A coleção de testes da API está disponível no ficheiro `postman_collection.json` na raiz do repositório. Para importar:

1. Abre o Postman
2. Clica em **Import**
3. Seleciona o ficheiro `postman_collection.json`
4. Define a variável de ambiente `base_url` com o URL da API (`http://localhost:4242`)

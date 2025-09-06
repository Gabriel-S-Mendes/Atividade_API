const express = require('express');
const cors = require('cors'); // Para permitir requisições de diferentes origens
const morgan = require('morgan'); // Para logs de requisição
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');

// Importações da Infraestrutura
const errorHandler = require('./scr/Infrastructure/Express/Middlewares/errorHandler');

const RedisTokenBlacklistRepository = require('./scr/Domain/Repositories/ITokenBlackListRepository');
const JwtProvider = require('./scr/Infrastructure/Providers/JwtProvider');
const authRoutes = require('./scr/Infrastructure/Express/routes/routes');

// Importações dos Use Cases
const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');

const app = express();

// --- Middlewares Globais
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(cors()); // Permite requisições de outras origens (CORS)
app.use(morgan('dev')); // Loga as requisições no console

// Injeção de Dependências
// Repositórios
const userRepository = new UserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();

const jwtProvider = new JwtProvider();

// Use Cases (recebem dependências de infraestrutura via construtor)
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);

// --- Rotas da API
// A rota principal do Express para o nosso serviço de autenticação
app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase));

// --- Configuração do Swagger UI ---
try {
  const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yml', 'utf8'));
  // Acessível em http://localhost:3000/api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Failed to load swagger.yml file:', e);
}

// --- Middleware de Tratamento de Erros ---
// Deve ser o último middleware a ser registrado
app.use(errorHandler);

module.exports = app;
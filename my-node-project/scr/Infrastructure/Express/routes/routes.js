const { Router } = require('express'); // Import Router
const AuthController = require('infrastructure/Express/controllers/AuthController');
const validate = require('src/infrastructure/Express/middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('src/infrastructure/Express/validationSchemas/authSchemas');

module.exports = (registerUserUseCase, loginUserUseCase) => {
  const router = Router();

  const authController = new AuthController(registerUserUseCase, loginUserUseCase);

  router.post('/register', validate(registerSchema), authController.register.bind(authController));
  router.post('/login', validate(loginSchema), authController.login.bind(authController));

  return router;
};
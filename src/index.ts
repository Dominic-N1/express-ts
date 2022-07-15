import express, { Request, Response } from 'express';
import { router } from './loginRoutes';
import cookieSession from 'cookie-session';

const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['MustBeAString'] }));
app.use(router);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

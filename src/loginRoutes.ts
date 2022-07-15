import { Router, Request, Response, NextFunction } from "express";
import path from "path";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }
  res.status(403).send("Not permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response): void => {
  res.send(`<form action="/login" method="post">
  <div>
    <label for="email">Email</label>
    <input type="text" name="email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" />
  </div>
  <button type="submit">Submit</button>
</form>`);
});
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email?.trim() === "a@a.com" && password?.trim() === "1") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/", (req: Request, res: Response): void => {
  if (req.session?.loggedIn) {
    res.send(
      `<div><h1>You are logged in</h1><h1><a href="/logout">loguot</a></h1></div>`
    );
  } else {
    res.send(
      `<div><h1>You are not logged in</h1><h1><a href="/login">login</a></h1></div>`
    );
  }
});

router.get("/logout", (req: Request, res: Response): void => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response): void => {
  res.send("Welcome to protected route");
});

export { router };

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as sessionFileStore from 'session-file-store';
import * as passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
    }),
  );
  const FileStore = sessionFileStore(session);

  app.use(
    session({
      secret: 'secret',
      // resave: false,
      // saveUninitialized: false,
      store: new FileStore({
        path: join(__dirname, '../sessions'),
      }),
      // genid: () => uuidv4(),
      cookie: {
        // httpOnly: true,
        // secure: true,
        // sameSite: true,
        maxAge: 3600000, // Time is in miliseconds
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.setViewEngine('hbs');

  app.use((req, res, next) => {
    // res.local = {};
    res.locals.user = req.user;
    res.locals.isLoggedIn = Boolean(req.user);
    next();
  });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

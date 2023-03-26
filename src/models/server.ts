import express, { Application } from 'express';
import albumRoutes from '../routes/album';
import authRoutes from '../routes/auth';
import cors from 'cors';

class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    albums: '/api/albums',
    auth: '/api/auth'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.middlewares();
    this.routes();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Body parse
    this.app.use( express.json() );

  }


  routes() {
      this.app.use( this.apiPaths.albums, albumRoutes )
      this.app.use( this.apiPaths.auth, authRoutes )
  }

  listen = () => {
    this.app.listen( this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);
    })
  }
}

export default Server;
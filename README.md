### Env

Ensure environmental variables are entered in .env or .env.development file before building. see .env.example for required keys

### Build the Docker Image

In the root of the project run the following command to build the container:

`docker build -t loopfeed . `

### Start Development Server

Run:
`docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules --rm loopfeed`

The project Will be available on [http://localhost:5173/](http://localhost:5173/)

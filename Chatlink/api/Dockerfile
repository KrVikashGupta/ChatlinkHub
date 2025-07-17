
# multi stage build

# stage 1: build the application
FROM node:23-alpine as builder

# setting wroking directory for all subsequent requests
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
# If these files don't change, all subsequent layers will be cached
COPY package*.json ./ 
COPY tsconfig.json ./ 

# Install all dependencies (including devDependencies)
# Use 'npm ci' instead of 'npm install' for consistent installations
RUN npm ci

# copy source code 
COPY src/ ./src/

# build TypeScript code
# this will create the ./dist directory with compiled JavaScript
RUN npm run build

# stage 2: Production image
FROM node:23-alpine

# set working directory 
WORKDIR /usr/src/app

# copy package files
COPY package*.json ./

# installs only production dependencies, reduces final img size
RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000

CMD [ "node", "dist/server.js" ]




# Build stage
FROM node:22-alpine as build

# add build argument 
ARG VITE_BASE_URL
ARG VITE_API_BASE_URL

# environment variable
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

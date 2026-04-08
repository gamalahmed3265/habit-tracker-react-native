# Dockerfile for Expo React Native App
FROM node:20-alpine

# Install dependencies for expo
RUN apk add --no-cache bash git python3 make g++

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Metro bundler port
EXPOSE 8081

# Start Expo
CMD ["npx", "expo", "start", "--tunnel", "--clear"]

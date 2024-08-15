# Use an official Node.js runtime as the base image
FROM node:18-alpine as builder 

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

FROM nginx

EXPOSE 80 

COPY --from=builder /app/build/ /usr/share/nginx/html


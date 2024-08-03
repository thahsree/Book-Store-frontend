# Build Stage
FROM node:alpine3.18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Serve Stage
FROM nginx:1.23-alpine

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf *

# Copy the built assets from the build stage to the Nginx container
COPY --from=build /app/build .

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]

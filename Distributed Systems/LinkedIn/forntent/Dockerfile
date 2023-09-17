# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application (you can customize this for your project)
RUN npm run build

# Expose a port (use the same port your app is running on)
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]

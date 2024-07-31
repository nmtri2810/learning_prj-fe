# Use the official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]

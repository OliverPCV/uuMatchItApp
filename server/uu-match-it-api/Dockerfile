# Base image
FROM node:18.17

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# RUN npm uninstall bcrypt
# RUN npm install bcrypt


# Bundle app source
COPY . .

# Copy the .env and .env.development files
# COPY .env .env.development ./

# Creates a "dist" folder with the production build
RUN npm run build 2>&1

# Expose the port on which the app will run
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start", "2>&1"]

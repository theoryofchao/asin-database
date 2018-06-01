# Use an official Python runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN npm install
RUN cd asin-frontend && npm install

# Make port 3000 available to the world outside this container
EXPOSE 3001 3000 5432

ENTRYPOINT npm start
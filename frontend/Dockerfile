# Specify base image
FROM node:21-alpine3.18

# Specify working directory
WORKDIR /user/src/frontend

# Copy application files
COPY package*json  ./

# Install build dependencies
RUN npm install

# Copy application files
COPY . .

## Expose Nuxt port
#EXPOSE 3000
#
## Specify image command
#CMD ["node", ".output/server/index.mjs"]
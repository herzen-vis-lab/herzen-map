FROM node

# Optimise for production
ENV NODE_ENV production
ENV REACT_APP_BACKEND_URI="https://api-map.herzen.spb.ru"
ENV REACT_APP_ADMIN_USERNAME="RGPU"
ENV REACT_APP_ADMIN_PASSWORD_HASH="02a9806890e8d703fcc111190e72a6f5674773c93bcce3242cc795e9b8c9f0c5"

# Create app directory
WORKDIR /usr/src/app

# Copy app files
COPY --chown=node:node . /usr/src/app

# Install only production dependencies
RUN npm ci --only=production

# friends don’t let friends run containers as root!
USER node

# Make port 3000 accessible outside of the container
EXPOSE 3000
CMD ["npm", "start"]

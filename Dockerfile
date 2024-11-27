FROM node:20

ENV NODE_ENV production
ENV REACT_APP_BACKEND_URI="https://api-map.herzen.spb.ru"
ENV REACT_APP_ADMIN_USERNAME="RGPU"
ENV REACT_APP_ADMIN_PASSWORD_HASH="02a9806890e8d703fcc111190e72a6f5674773c93bcce3242cc795e9b8c9f0c5"
ENV GENERATE_SOURCEMAP=false

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm install && npm install -g serve && npm run build

USER node

EXPOSE 3000

CMD ["serve", "-s", "build"]

FROM gitpod/workspace-full

USER root

RUN sudo apt-get update && \
    sudo apt-get upgrade -y && \
    sudo apt-get install -y gnupg2 && \
    sudo apt-get install -y git && \
    sudo apt-get install -y curl &&\
    sudo apt-get install -y apt-transport-https ca-certificates

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && apt-get install -y yarn
RUN export PATH="$PATH:/opt/yarn-[version]/bin"

# WORKDIR /code
# RUN mkdir /code/empatica-dashboard
# COPY package.json /code/empatica-dashboard
# WORKDIR /code/empatica-dashboard
RUN yarn install

EXPOSE 4000
CMD ["yarn", "dev"]

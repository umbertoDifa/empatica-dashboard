FROM gitpod/workspace-full

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y gnupg2 && \
    apt-get install -y git && \
    apt-get install -y curl &&\
    apt-get install -y apt-transport-https ca-certificates

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn
RUN export PATH="$PATH:/opt/yarn-[version]/bin"

WORKDIR /code
RUN mkdir /code/empatica-dashboard
#RUN git clone https://github.com/umbertoDifa/empatica-dashboard.git
COPY package.json /code/empatica-dashboard
WORKDIR /code/empatica-dashboard
RUN yarn install

EXPOSE 4000
CMD ["yarn", "dev"]

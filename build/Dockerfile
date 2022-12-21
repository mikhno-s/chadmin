FROM golang:1.19 as backend
WORKDIR /build

ADD go.mod go.sum .
RUN go mod download

ADD main.go .
ADD ./pkg ./pkg
RUN go build .

FROM node:18 as frontend
WORKDIR /build
ADD package.json .
RUN yarn
ADD tsconfig.json .
ADD ./src ./src
ADD ./public ./public
RUN yarn build

FROM ubuntu:latest as final
WORKDIR /
COPY --from=backend /build/chadmin .
COPY --from=frontend /build/dist /dist
ENTRYPOINT ["./chadmin"]

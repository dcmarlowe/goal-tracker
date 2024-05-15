FROM nginx:alpine

LABEL org.opencontainers.image.title="Goal Tracker" \
      org.opencontainers.image.description="Basic Goal Tracker" \
      org.opencontainers.image.authors="@dustinmarlowe"

EXPOSE 80

# expect the ./dist folder to contain the compiled application
COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
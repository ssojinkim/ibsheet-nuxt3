import { createServer, Model } from "miragejs";

export default defineNuxtPlugin(({ environment = "development" } = {}) => {
  let server = createServer({
    environment,

    models: {
      member: Model,
    },

    seeds(server) {
      server.create("member", {
        id: 0,
        name: "김소진",
        team: "FE팀",
        role: "프로",
        phoneNumber: "010-3543-5165",
        age: "24",
        birthDate: "1998-10-09",
        meal: "F",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/members", (schema) => {
        return schema.members.all();
      });

      this.post("/members", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create("members", attrs);
      });
    },
  });

  return server;
});

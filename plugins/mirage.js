import { createServer, Model } from "miragejs";

export default defineNuxtPlugin(({ environment = "development" } = {}) => {
  let server = createServer({
    environment,

    models: {
      item: Model,
    },

    seeds(server) {
      server.create("item", {
        id: 1,
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

      this.get("/items", (schema) => {
        return schema.items.all();
      });

      this.post("/items", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.items.create(attrs);
      });

      this.put("/items/:id", (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const item = schema.items.find(id);
        return item.update(newAttrs);
      });

      this.delete("items/:id", (schema, request) => {
        const id = request.params.id;
        return schema.items.find(id).destroy();
      });
    },
  });
});

import { createServer, Model, Factory, Response } from "miragejs";
import { faker } from "@faker-js/faker";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    // Models
    models: {
      song: Model,
    },

    // Factories
    factories: {
      song: Factory.extend({
        title() {
          const ethiopianTitles = [
            "Tizita",
            "Yegelle Tezeta",
            "Addis Ababa Bete",
            "Ene Wodajen",
            "Ethio Blues",
            "Muziqawi Silt",
            "Ambassel",
            "Anchihoye Lene",
          ];
          return faker.helpers.arrayElement(ethiopianTitles);
        },

        artist() {
          const ethiopianArtists = [
            "Mulatu Astatke",
            "Mahmoud Ahmed",
            "Gigi Shibabaw",
            "Aster Aweke",
            "Tilahun Gessesse",
            "Asnaketch Worku",
            "Alemayehu Eshete",
            "Ali Birra",
          ];
          return faker.helpers.arrayElement(ethiopianArtists);
        },

        album() {
          const ethiopianAlbums = [
            "Éthiopiques, Vol. 4: Ethio Jazz & Groove",
            "Ere Mela Mela",
            "Abyssinia Infinite",
            "Hagere",
            "Tezeta (Ethiopian Blues & Soul)",
            "Ethiopian Modern Instrumentals",
            "Fikratchin",
            "The Rough Guide to the Music of Ethiopia",
          ];
          return faker.helpers.arrayElement(ethiopianAlbums);
        },

        year() {
          return faker.date
            .between({
              from: "1960-01-01T00:00:00.000Z",
              to: "2020-12-31T23:59:59.999Z",
            })
            .getFullYear();
        },

        genre() {
          const ethiopianGenres = [
            "Ethio-Jazz",
            "Traditional",
            "Ethiopian Pop",
            "Blues",
            "Soul",
          ];
          return faker.helpers.arrayElement(ethiopianGenres);
        },
      }),
    },

    // Seed initial data
    seeds(server) {
      server.createList("song", 20);
    },

    // Routes
    routes() {
      this.namespace = "api";
      this.timing = 750;

      // GET all songs
      this.get("/songs", (schema) => {
        return schema.songs.all();
      });

      // POST new song
      this.post("/songs", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.songs.create(attrs);
      });

      // UPDATE song
      this.put("/songs/:id", (schema, request) => {
        const id = request.params.id;
        const newAttrs = JSON.parse(request.requestBody);
        const song = schema.songs.find(id);

        if (!song) {
          return new Response(404, {}, { errors: ["Song not found"] });
        }

        return song.update(newAttrs);
      });

      // DELETE song
      this.delete("/songs/:id", (schema, request) => {
        const id = request.params.id;
        const song = schema.songs.find(id);

        if (!song) {
          return new Response(404, {}, { errors: ["Song not found"] });
        }

        song.destroy();
        return new Response(204);
      });
    },
  });
}

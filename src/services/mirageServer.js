import { createServer, Model, Factory } from "miragejs";
import { faker } from '@faker-js/faker';
// MirageJS uses these models to store and manage data in its in-memory database
export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    // Define data models for your application
    models: {
      song: Model, 
    },


    // This helps populate my in-memory database with realistic-looking data
    factories: {
      song: Factory.extend({
        id(i) {
          return faker.string.uuid(); 
        },
        title() {
          return faker.music.songName(); 
        },
        artist() {
          return faker.person.fullName(); 
        },
        album() {
          return faker.lorem.words(3); 
        },
        year() {
          return faker.date.past({
            years: 50,
            refDate: new Date()
          }).getFullYear(); 
        },
        genre() {
          return faker.music.genre(); 
        },
      }),
    },

    seeds(server) {
      server.createList("song", 10); // Create 10 fake songs when the server starts
    },

    // Define your API routes
  
    routes() {
      this.namespace = "api"; // All API calls will be prefixed with /api (e.g., /api/songs)
      this.timing = 750; // Simulate network latency (750ms delay for all requests)

      // GET all songs
      this.get("/songs", (schema, request) => {
        return schema.songs.all(); 
      });

      // POST a new song
      this.post("/songs", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.songs.create(attrs); 
      });

      // PUT/PATCH to update a song by ID
      this.put("/songs/:id", (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody); 
        const id = request.params.id;
        const song = schema.songs.find(id); 

        if (!song) {
          return new Response(404, {}, { errors: ["Song not found"] }); 
        }

        return song.update(newAttrs);
      });

      // DELETE a song by ID
      this.delete("/songs/:id", (schema, request) => {
        const id = request.params.id;
        const song = schema.songs.find(id);

        if (!song) {
          return new Response(404, {}, { errors: ["Song not found"] }); // Handle song not found
        }

        song.destroy(); // Delete the song
        return new Response(204); // Return 204 No Content for successful deletion
      });
    },
  });
}
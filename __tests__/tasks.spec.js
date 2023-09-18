import knex from "knex";
import supertest from "supertest";
import { DockerComposeEnvironment } from "testcontainers";
import knexfile from "../knexfile";
import Application from "../src/app";

describe("Tasks", () => {
  jest.setTimeout(60000);

  const composeFilePath = "";
  const composeFile = "docker-compose.yml";
  const { app } = new Application();

  let enviroment;
  let database = knex(knexfile["development"]);

  beforeAll(async () => {
    enviroment = await new DockerComposeEnvironment(
      composeFilePath,
      composeFile
    ).up();
  });

  afterAll(async () => {
    await enviroment.down();
    await database.destroy();
  });

  beforeEach(async () => {
    await database.migrate.rollback({}, true);
    await database.migrate.latest();
  });

  it("/GET api/tasks", async () => {
    let [CREATED_TASK] = await database.table("tasks").returning("*").insert({
      name: "task",
      description: "mock description",
    });

    CREATED_TASK = JSON.stringify(CREATED_TASK);

    await supertest(app)
      .get("/api/tasks/")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(1);
        const [task] = body;
        expect(task).toEqual(JSON.parse(CREATED_TASK));
      });
  });

  it("/GET api/tasks/:id", async () => {
    let [CREATED_TASK] = await database.table("tasks").returning("*").insert({
      name: "task",
      description: "mock description",
    });

    await supertest(app)
      .get(`/api/tasks/${CREATED_TASK.id}`)
      .expect(200)
      .then(({ body }) => {
        CREATED_TASK = JSON.stringify(CREATED_TASK);
        expect(body).toEqual(JSON.parse(CREATED_TASK));
      });
  });

  it("/POSTS api/tasks", async () => {
    const MOCK_TASKS = {
      name: "Dummy Task",
      description: "Dummy Description",
    };

    await supertest(app)
      .post("/api/tasks")
      .send(MOCK_TASKS)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          id: expect.any(String),
          name: MOCK_TASKS.name,
          description: MOCK_TASKS.description,
          created_at: expect.any(String),
          updated_at: expect.any(String),
          isDone: false,
        });
      });
  });

  it("/PATCH api/tasks/:id", async () => {
    const [CREATED_TASK] = await database.table("tasks").returning("*").insert({
      name: "task",
      description: "mock description",
    });

    const UPDATED_TASK = {
      name: "task updated",
      description: "mock description updated",
    };

    await supertest(app)
      .patch(`/api/tasks/${CREATED_TASK.id}`)
      .send(UPDATED_TASK)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          id: CREATED_TASK.id,
          name: UPDATED_TASK.name,
          description: UPDATED_TASK.description,
          isDone: false,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        });
      });
  });
});

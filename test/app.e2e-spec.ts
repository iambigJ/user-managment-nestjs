import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { PrismaService } from "../src/prisma/prisma.service"
import { AppModule } from "../src/app.module"
import * as pactum from "pactum"
import { loginDto, signupDto } from "../src/auth/dto"

describe("App E2E", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, skipUndefinedProperties: true }))

    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanUp()
    pactum.request.setBaseUrl(process.env.APP_URL)

  })

  afterAll(async () => {
    app.close()
  })

  describe("Auth.", () => {
    describe("Signup", () => {
      it("Should signup", () => {
        const dto: signupDto = {
          email: "reza@outlook.com   ",
          password: "rez   ",
          name: "ramin ",
          lastName: "Mousavi   ",
          telephone: "09125588979"
        }
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto as signupDto)
          .expectStatus(201)
      })
    })
    describe("Login", () => {
      it("Should Login", () => {
        const dto: loginDto = {
          email: "reza@outlook.com",
          password: "rez   "
        }
        return pactum
          .spec()
          .post("/auth/login")
          .withBody(dto as loginDto)
          .expectStatus(201)
          .stores("userAT", "access_token")
      })
    })
  })

  describe("Form", () => {
    const data = {
      domain: "Http://localhost:5000    ",
      signupFields: {
        email: {
          unique: true,
          inLogin: true,
          isPassword: false,
          required: true
        },
        name: {
          unique: false,
          inLogin: false,
          isPassword: false,
          required: false
        },
        password: {
          unique: false,
          inLogin: true,
          isPassword: true,
          required: true
        }
      }
    }

    it("Add new form", () => {
      return pactum
        .spec()
        .post("/form/new")
        .withHeaders({ Authorization: "Bearer $S{userAT}" })
        .withBody(data)
        .expectStatus(201)
    })
    it("List of forms", () => {
      return pactum
        .spec()
        .get("/form/list")
        .withHeaders({ Authorization: "Bearer $S{userAT}" })
        .expectStatus(200)
    })
    it("Get form by id", () => {
      return pactum
        .spec()
        .get("/form/1")
        .withHeaders({ Authorization: "Bearer $S{userAT}" })
        .expectStatus(200)
    })
    it("Delete form by id", () => {
      return pactum
        .spec()
        .delete("/form/1")
        .withHeaders({ Authorization: "Bearer $S{userAT}" })
        .expectStatus(200)
    })
    it("Restore form by id", () => {
      return pactum
        .spec()
        .patch("/form/restore/1")
        .withHeaders({ Authorization: "Bearer $S{userAT}" })
        .expectStatus(200)
    })
  })


})

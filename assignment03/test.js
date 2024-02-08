import { before, describe, it, after } from "mocha";
import chai from "chai";
import dotenv from "dotenv";
import createServer from "./server.js";
import chaiHttp from "chai-http";
import { expect } from "chai";

chai.use(chaiHttp);
dotenv.config();


describe("Posts", () => {
    let server;
    let postId;

    before(async () => {
        server = await createServer();
    });

    it("should POST a post", (done) => {
        let post = {
            title: "Test Title",
            content: "Test Content",
            author: "Test Author",
        };
        chai.request(server)
            .post("/posts")
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("id");
                postId = res.body.id;
                done();
            });
    });

    it("should GET a post by the given id", (done) => {
        chai.request(server)
            .get("/posts/" + postId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("_id").eql(postId);
                done();
            });
    });

    it("should UPDATE a post given the id", (done) => {
        let post = {
            title: "Updated Title",
            content: "Updated Content",
            author: "Updated Author",
        };
        chai.request(server)
            .put("/posts/" + postId)
            .send(post)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("id").eql(postId);
                done();
            });
    });

    it("should DELETE a post given the id", (done) => {
        chai.request(server)
            .delete("/posts/" + postId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("id").eql(postId);
                done();
            });
    });
});

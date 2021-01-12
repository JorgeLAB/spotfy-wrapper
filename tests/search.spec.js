import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
import {
  search,
  searchTracks,
  searchArtists,
  searchAlbums,
  searchPlaylists,
} from "../src/search";

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require("node-fetch");

describe("Search Wrapper", () => {
  describe("Smoke tests", () => {
    it("should exist the search method", function () {
      expect(search).to.exist;
    });

    it("should exist the searchAlbum method", function () {
      expect(searchAlbums).to.exist;
    });

    it("should exist the searchTracks method", function () {
      expect(searchTracks).to.exist;
    });

    it("should exist the searchPlaylist method", function () {
      expect(searchPlaylists).to.exist;
    });

    it("should exist the searchArtist method", function () {
      expect(searchArtists).to.exist;
    });
  });

  describe("Generic Search", () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call fetch function", () => {
      const artists = search("Smith", "artist");
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the currect url to fetch", () => {
      context("should to pass one type", () => {
        const artists = search("Smith", "artist");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Smith&type=artist"
        );

        const albuns = search("Smith", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Smith&type=album"
        );
      });

      context("should to pass more than one type", () => {
        const albunsAndArtists = search("Smith", ["album", "artist"]);
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Smith&type=album,artist"
        );
      });
    });

    it("should return the  JSON data from the promise", () => {
      promise.resolves({ body: "json" });
      const artists = search("Smiths", "artist");

      expect(artists.resolveValue).to.be.eql({ body: "json" });
    });
  });

  describe("searchArtists", () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call the function", () => {
      const artists = searchArtists("Smith");
      expect(fetchedStub).to.be.calledOnce;
    });

    it("should receive the correct request", () => {
      const firstArtists = searchArtists("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=artist`
      );

      const secondArtists = searchArtists("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=artist`
      );
    });
  });

  describe("searchAlbums", () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call fetch function", () => {
      const albums = searchAlbums("Smith");
      expect(fetchedStub).to.be.calledOnce;
    });

    it("should receive the current url to fetch", () => {
      const firstAlbum = searchAlbums("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=album`
      );

      const secondAlbum = searchAlbums("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=album`
      );
    });
  });

  describe("searchTracks", () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call function", () => {
      const tracks = searchTracks("Smith");
      expect(fetchedStub).to.be.calledOnce;
    });

    it("should receive correct url to fetch", () => {
      const firstTracks = searchTracks("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=track`
      );

      const secondTracks = searchTracks("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=track`
      );
    });
  });

  describe("searchPlaylists", () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call the function", () => {
      const playlists = searchPlaylists("Smith");
      expect(fetchedStub).to.be.calledOnce;
    });

    it("should receive the correct request", () => {
      const firstPlaylist = searchPlaylists("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=playlist`
      );

      const secondPlaylist = searchPlaylists("Smith");
      expect(fetchedStub).to.be.calledWith(
        `https://api.spotify.com/v1/search?q=Smith&type=playlist`
      );
    });
  });
});

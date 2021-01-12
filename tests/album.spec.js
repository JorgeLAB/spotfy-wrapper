import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

global.fetch = require('node-fetch');

describe('getAlbum method', () => {

  describe('Smoke tests', () => {
    it('should exists getAbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should exists getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should exists getAlbumTracks me method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum method', () => {
    let fetchedStub;
    let promise;
    let id;

    beforeEach(() => {
      id = "6cI1XoZsOhkyrCwtuI70CN";
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call the fetch', () => {
      const album = getAlbum(id);
      expect(fetch).to.have.been.calledOnce;
    });

    it('should receive the current url to fetch', () => {
      const album = getAlbum(id);
      expect(fetchedStub).to.have.been.calledWith(`https://api.spotify.com/v1/albums/${id}`);
    });

    it('should receive result of the fetch method', () => {
      promise.resolves({ album: 'json'});
      const album = getAlbum(id);
      expect(album.resolveValue).to.be.eql({ album: 'json'})
    })
  });

  describe('getAlbums method', () => {
    let fetchedStub;
    let promise;
    let ids;

    beforeEach(() => {
      ids = [ "382ObEPsp2rxGrnsizN5TX","1A2GTWGtFfWp7KSQTwWOyo" ];
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore()
    })

    it('should call the fetch function', () => {
      const albums = getAlbums(ids);
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call correct URL', () => {
      const albuns = getAlbums(ids);
      expect(fetchedStub).to.have.been.calledWith(`https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo`);
    });

    it('should return the JSON data from promise', () => {
      promise.resolves({ albuns: 'json'});
      const albuns = getAlbums(ids);
      expect(albuns.resolveValue).to.be.eql({ albuns: 'json' })
    });
  });

  describe('getAlbumTracks', () => {
    let fetchedStub;
    let promise;
    let id;

    beforeEach(() => {
      id = "4aawyAB9vmqN3uQ7FjRGTy"
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call to the fetch function', () => {
      const tracks = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce
    });

    it('should receive the correct url to fetch', () => {
      const tracks = getAlbumTracks(id);
      expect(fetchedStub).to.have.been.calledWith(`https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`)
    });

    it('should return the JSON data from promise', () => {
      promise.resolves({ tracks: 'json' });
      const tracks = getAlbumTracks(id);
      expect(tracks.resolveValue).to.be.eql({ tracks: 'json'})
    });
  });
});

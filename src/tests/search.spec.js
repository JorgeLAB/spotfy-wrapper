import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchTracks, searchArtists, searchAlbums, searchPlaylists } from '../main';

describe('Search Wrapper', () => {
  describe('Smoke tests', () => {

    it('should exist the search method', function(){
      expect(search).to.be.exist
    });

    it('should exist the searchAlbum method', function(){
      expect(searchAlbums).to.be.exist
    });

    it('should exist the searchTracks method', function(){
      expect(searchTracks).to.be.exist
    });

    it('should exist the searchPlaylist method', function(){
      expect(searchPlaylists).to.be.exist
    });

    it('should exist the searchArtist method', function(){
      expect(searchArtists).to.be.exist
    });
  });

  describe('Generic Search', () => {

    let fetchedStub = "";

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });


    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the currect url to fetch', () => {
      context('should to pass one type', () => {
        const artists = search('Smith','artist');
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Smith&type=artist");

        const albuns = search('Smith','album');
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Smith&type=album");
      });

      context('should to pass more than one type', () => {
        const albunsAndArtists = search('Smith', [ "album", "artist" ]);
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Smith&type=album,artist");
      });

    })
  });
})

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

    it('Should call fetch function', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });
  });
})

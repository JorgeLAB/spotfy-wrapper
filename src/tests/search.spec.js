import { expect } from 'chai';
import { search, searchTracks, searchArtists, searchAlbums, searchPlaylists } from '../main';

describe('Search', function(){
  describe('smoke tests', function(){

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

  })
})

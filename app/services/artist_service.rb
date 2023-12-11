class ArtistService
    # A function to list all artists
    def self.listAll
        ArtistRepository.all
    end
    # A function to create an artist
    def self.save(artist_params)
        ArtistRepository.create(artist_params)
    end 
    # A function to find an artist by id
    def self.get(artist_params)
        ArtistRepository.find_by_id(artist_params[:id])
    end
    # A function to update an artist
    def self.update(artist, artist_params)
        ArtistRepository.update_attributes(artist, artist_params)
    end
    # A function to delete an artist
    def self.delete(artist_params)
        ArtistRepository.delete_by_id(artist_params[:id])
    end  
end
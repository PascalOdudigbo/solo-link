class ArtistService
    def self.listAll
        ArtistRepository.all
    end

    def self.save(artist_params)
        ArtistRepository.create(artist_params)
    end 

    def self.get(artist_params)
        ArtistRepository.find_by_id(artist_params[:id])
    end

    def self.update(artist, artist_params)
        ArtistRepository.update_attributes(artist, artist_params)
    end

    def self.delete(artist_params)
        ArtistRepository.delete_by_id(artist_params[:id])
    end  
end
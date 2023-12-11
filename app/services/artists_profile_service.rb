class ArtistsProfileService
    def self.listAll
        ArtistsProfileRepository.all
    end

    def self.save(artist_params)
        ArtistsProfileRepository.create(artist_params)
    end 

    def self.get(artist_params)
        ArtistsProfileRepository.find_by_id(artist_params[:id])
    end

    def self.update(artist, artist_params)
        ArtistsProfileRepository.update_attributes(artist, artist_params)
    end

    def self.delete(artist_params)
        ArtistsProfileRepository.delete_by_id(artist_params[:id])
    end  
end
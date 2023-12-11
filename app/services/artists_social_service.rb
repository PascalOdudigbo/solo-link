class ArtistsSocialService
    def self.listAll
        ArtistsSocialRepository.all
    end

    def self.save(artists_social_params)
        ArtistsSocialRepository.create(artists_social_params)
    end 

    def self.get(artists_social_params)
        ArtistsSocialRepository.find_by_id(artists_social_params[:id])
    end

    def self.update(artists_social, artists_social_params)
        ArtistsSocialRepository.update_attributes(artists_social, artists_social_params)
    end

    def self.delete(artists_social_params)
        ArtistsSocialRepository.delete_by_id(artists_social_params[:id])
    end  
end
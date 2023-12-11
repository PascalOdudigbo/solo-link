class ArtistsSocialService
    # A function to list all artists socials
    def self.listAll
        ArtistsSocialRepository.all
    end

    # A function to create an artists socials   
    def self.save(artists_social_params)
        ArtistsSocialRepository.create(artists_social_params)
    end 

    # A function to find an artist socials by id
    def self.get(artists_social_params)
        ArtistsSocialRepository.find_by_id(artists_social_params[:id])
    end

    # A function to update an artist socials
    def self.update(artists_social, artists_social_params)
        ArtistsSocialRepository.update_attributes(artists_social, artists_social_params)
    end

    # A function to delete an artist socials
    def self.delete(artists_social_params)
        ArtistsSocialRepository.delete_by_id(artists_social_params[:id])
    end  
end
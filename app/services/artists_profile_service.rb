class ArtistsProfileService
    def self.listAll
        ArtistsProfileRepository.all
    end

    def self.save(artists_profile_params)
        ArtistsProfileRepository.create(artists_profile_params)
    end 

    def self.get(artists_profile_params)
        ArtistsProfileRepository.find_by_id(artists_profile_params[:id])
    end

    def self.update(artists_profile, artists_profile_params)
        ArtistsProfileRepository.update_attributes(artists_profile, artists_profile_params)
    end

    def self.delete(artists_profile_params)
        ArtistsProfileRepository.delete_by_id(artists_profile_params[:id])
    end  
end
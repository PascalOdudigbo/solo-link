class ArtistsProfileService
    # A function to list all artist profiles
    def self.listAll
        ArtistsProfileRepository.all
    end

    # A function to create an artist profile
    def self.save(artists_profile_params)
        ArtistsProfileRepository.create(artists_profile_params)
    end 

    # A function to find an artist profile by id
    def self.get(artists_profile_params)
        ArtistsProfileRepository.find_by_id(artists_profile_params[:id])
    end

    # A function to update an artist profile
    def self.update(artists_profile, artists_profile_params)
        ArtistsProfileRepository.update_attributes(artists_profile, artists_profile_params)
    end

    # A function to delete an artist profile
    def self.delete(artists_profile_params)
        ArtistsProfileRepository.delete_by_id(artists_profile_params[:id])
    end  
end
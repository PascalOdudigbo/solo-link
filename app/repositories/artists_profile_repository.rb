class ArtistsProfileRepository
    # A function to list all artist profiles
    def self.all
        ArtistsProfile.all
    end

    # A function to create a artist profile
    def self.create(artists_profile_params)
        ArtistsProfile.create(artists_profile_params)
    end

    # A function to find an artist profile by id
    def self.find_by_id(artists_profile_id)
        ArtistsProfile.find(artists_profile_id)
    end

    # A function to find an artist profile using a specific attribute
    def self.find_by_attribute(attribute, value)
        ArtistsProfile.find_by(attribute => value)
    end

    # A function to find an artist profile that satisfies a condition
    def self.where(conditions)
        ArtistsProfile.where(conditions)
    end

    # A function to update a artist profile
    def self.update_attributes(artists_profile, artists_profile_params)
        artists_profile.update(artists_profile_params)
    end
    
    # A function to delete a artist profile
    def self.delete_by_id(artists_profile_id)
        artists_profile = ArtistsProfile.find(artists_profile_id)
        artists_profile.destroy
    end
 
end
class ArtistsProfileRepository
    def self.all
        ArtistsProfile.all
    end 

    def self.create(artists_profile_params)
        ArtistsProfile.create(artists_profile_params)
    end

    def self.find_by_id(artists_profile_id)
        ArtistsProfile.find(artists_profile_id)
    end

    def self.find_by_attribute(attribute, value)
        ArtistsProfile.find_by(attribute => value)
    end

    def self.where(conditions)
        ArtistsProfile.where(conditions)
    end

    def self.update_attributes(artists_profile, artists_profile_params)
        artists_profile.update(artists_profile_params)
    end

    def self.delete_by_id(artists_profile_id)
        artists_profile = ArtistsProfile.find(artists_profile_id)
        artists_profile.destroy
    end
 
end
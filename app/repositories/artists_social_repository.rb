class ArtistsSocialRepository
    def self.all
        ArtistsSocial.all
    end 

    def self.create(artists_social_params)
        ArtistsSocial.create(artists_social_params)
    end

    def self.find_by_id(artists_social_id)
        ArtistsSocial.find(artists_social_id)
    end

    def self.find_by_attribute(attribute, value)
        ArtistsSocial.find_by(attribute => value)
    end

    def self.where(conditions)
        ArtistsSocial.where(conditions)
    end

    def self.update_attributes(artists_social, artists_social_params)
        artists_social.update(artists_social_params)
    end

    def self.delete_by_id(artists_social_id)
        artists_social = ArtistsSocial.find(artists_social_id)
        artists_social.destroy
    end
 
end
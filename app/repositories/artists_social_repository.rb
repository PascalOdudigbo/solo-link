class ArtistsSocialRepository
    # A function to list all artists socials
    def self.all
        ArtistsSocial.all
    end

    # A function to create an artists socials
    def self.create(artists_social_params)
        ArtistsSocial.create(artists_social_params)
    end

    # A function to find an artist socials by id
    def self.find_by_id(artists_social_id)
        ArtistsSocial.find(artists_social_id)
    end

    # A function to find an artist socials using a specific attribute
    def self.find_by_attribute(attribute, value)
        ArtistsSocial.find_by(attribute => value)
    end

    # A function to find an artist socials that satisfies a condition
    def self.where(conditions)
        ArtistsSocial.where(conditions)
    end

    # A function to update an artist socials
    def self.update_attributes(artists_social, artists_social_params)
        artists_social.update(artists_social_params)
    end
    
    # A function to delete an artist socials
    def self.delete_by_id(artists_social_id)
        artists_social = ArtistsSocial.find(artists_social_id)
        artists_social.destroy
    end
 
end